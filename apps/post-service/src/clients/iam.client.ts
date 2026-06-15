import { Injectable, Logger, OnModuleInit, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCircuitBreaker } from '@package/circuit-breaker';
import { RedisService } from '@package/redis';
import { RbacVersionTracker } from '@package/common';
import type { CircuitBreakerPolicy } from 'cockatiel';

// 2-3s is enough for an internal call on the same network; shorter than the
// previous 5s so a slow IAM fails fast and the breaker can trip sooner.
const IAM_TIMEOUT_MS = 3_000;
const MEMBERSHIP_CACHE_TTL_S = 60;

type Membership = { isMember: boolean; isOwner: boolean };

const DENY: Membership = { isMember: false, isOwner: false };

@Injectable()
export class IamClient implements OnModuleInit {
  private readonly logger = new Logger(IamClient.name);
  private readonly baseUrl: string;
  private readonly internalSecret: string;
  private breaker!: CircuitBreakerPolicy;
  private readonly versionTracker: RbacVersionTracker;

  constructor(
    private readonly config: ConfigService,
    @Optional() private readonly redis?: RedisService,
  ) {
    this.baseUrl = config.get<string>('IAM_INTERNAL_URL', 'http://localhost:3002/api/iam');
    this.internalSecret =
      config.get<string>('INTERNAL_API_SECRET') ||
      config.get<string>('app.internalApiSecret') ||
      '';
    this.versionTracker = new RbacVersionTracker(this.redis);
  }

  onModuleInit() {
    // Fail-fast after 5 consecutive failures; probe again after 10s. Matches
    // the policy used by RbacGuard / GroupPermissionGuard across the project.
    this.breaker = createCircuitBreaker({
      halfOpenAfterMs: 10_000,
      maxConsecutiveFailures: 5,
    });
    this.breaker.onBreak(() =>
      this.logger.warn('IamClient circuit breaker OPEN — failing fast (deny membership)'),
    );
  }

  async getGroupMembership(userId: string, groupId: string): Promise<Membership> {
    const fetchMembership = () => this.fetchMembership(userId, groupId);

    // Cache membership for 60s, version-aware via rbac:meta.version so an IAM
    // version bump implicitly invalidates every entry (no SCAN). getOrSet also
    // de-duplicates concurrent misses for the same key within this process and
    // serialises BigInt safely.
    try {
      if (this.redis?.isEnabled()) {
        const cacheKey = await this.buildCacheKey(userId, groupId);
        return await this.redis.getOrSet<Membership>(
          cacheKey,
          fetchMembership,
          MEMBERSHIP_CACHE_TTL_S,
        );
      }
    } catch {
      // Redis unavailable — fall through to a direct (breaker-guarded) call.
    }

    return fetchMembership();
  }

  private async buildCacheKey(userId: string, groupId: string): Promise<string> {
    const v = await this.versionTracker.get();
    return `iam:membership:v${v}:${userId}:${groupId}`;
  }

  /**
   * Calls IAM through the circuit breaker. Stays fail-open: any error (timeout,
   * 5xx, breaker open) resolves to DENY ({ isMember:false }) so we never grant
   * access we couldn't verify.
   */
  private async fetchMembership(userId: string, groupId: string): Promise<Membership> {
    const url = new URL(`${this.baseUrl}/internal/groups/membership`);
    url.searchParams.set('userId', userId);
    url.searchParams.set('groupId', groupId);

    try {
      const data = await this.breaker.execute(() => this.doGet(url.toString()));
      return data ?? DENY;
    } catch (err: any) {
      this.logger.warn(`IamClient getGroupMembership failed: ${(err as Error).message}`);
      return DENY;
    }
  }

  private async doGet(url: string): Promise<any> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IAM_TIMEOUT_MS);

    try {
      const headers: Record<string, string> = { Accept: 'application/json' };
      if (this.internalSecret) headers['x-internal-secret'] = this.internalSecret;

      const res = await fetch(url, { signal: controller.signal, headers });

      if (!res.ok) {
        // 5xx → throw so the breaker counts it as a failure. 4xx is a definite
        // answer from IAM (e.g. not a member); return null → DENY, no failure.
        if (res.status >= 500) throw new Error(`IAM returned ${res.status}`);
        this.logger.warn(`IamClient GET ${url} → ${res.status}`);
        return null;
      }

      const body = await res.json();
      return body?.data ?? body;
    } catch (err: any) {
      this.logger.warn(`IamClient GET ${url} failed: ${(err as Error).message}`);
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
