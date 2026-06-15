import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCircuitBreaker } from '@package/circuit-breaker';
import { RedisService } from '@package/redis';
import { RbacVersionTracker } from '@package/common';
import type { CircuitBreakerPolicy } from 'cockatiel';

const IAM_TIMEOUT_MS = 3_000;
const MEMBERSHIP_CACHE_TTL_S = 60;

interface GroupMembership {
  isMember: boolean;
  isOwner: boolean;
}

const DENY: GroupMembership = { isMember: false, isOwner: false };

@Injectable()
export class IamClient implements OnModuleInit {
  private readonly logger = new Logger(IamClient.name);
  private readonly baseUrl: string;
  private readonly internalSecret: string;
  private breaker!: CircuitBreakerPolicy;
  private readonly versionTracker: RbacVersionTracker;

  constructor(
    private readonly config: ConfigService,
    // RedisModule is @Global; injected here for membership caching.
    // Guarded with redis?.isEnabled() so the client still works if Redis
    // is unavailable (degrades to a direct, breaker-protected HTTP call).
    private readonly redis: RedisService,
  ) {
    this.baseUrl = config.get<string>('IAM_INTERNAL_URL', 'http://localhost:3002/api/iam');
    this.internalSecret =
      config.get<string>('INTERNAL_API_SECRET') ||
      config.get<string>('app.internalApiSecret') ||
      '';
    this.versionTracker = new RbacVersionTracker(this.redis);
  }

  onModuleInit() {
    // Consecutive-failure breaker: opens after 5 failures, half-opens after
    // 10s. While open, execute() throws BrokenCircuitError synchronously
    // (fail-fast) instead of hammering a down IAM. The caller treats any
    // throw as a deny (fail-open for availability, fail-closed for access:
    // never grants membership it could not verify).
    this.breaker = createCircuitBreaker({
      halfOpenAfterMs: 10_000,
      maxConsecutiveFailures: 5,
    });
    this.breaker.onBreak(() =>
      this.logger.warn('IamClient circuit breaker opened — IAM membership checks failing fast'),
    );
  }

  /**
   * Resolve a user's membership/ownership within a group.
   *
   * Cache: Redis, keyed by version + userId + groupId, TTL 60s. The version
   * comes from `rbac:meta.version` (bumped by IAM on permission/role/group
   * changes) so a bump implicitly invalidates every cached entry without a
   * SCAN — same strategy as GroupPermissionGuard.
   *
   * Resilience: the HTTP call is wrapped in a circuit breaker. Any failure
   * (timeout, 5xx, open breaker, Redis error) degrades to DENY — we never
   * grant membership we could not verify.
   *
   * NOTE: only positive lookups are produced by a successful call; a DENY
   * from a failed call is NOT cached (getOrSet only caches the factory's
   * fulfilled value, and on failure we short-circuit before caching).
   */
  async getGroupMembership(userId: string, groupId: string): Promise<GroupMembership> {
    const fetchMembership = async (): Promise<GroupMembership> => {
      const url = new URL(`${this.baseUrl}/internal/groups/membership`);
      url.searchParams.set('userId', userId);
      url.searchParams.set('groupId', groupId);
      const data = await this.doGet(url.toString());
      return {
        isMember: data?.isMember === true,
        isOwner: data?.isOwner === true,
      };
    };

    try {
      if (this.redis?.isEnabled()) {
        const version = await this.versionTracker.get();
        const cacheKey = `iam:membership:v${version}:${userId}:${groupId}`;
        // getOrSet caches only the resolved value; if fetchMembership throws
        // (breaker open / IAM down) it propagates and is caught below → DENY,
        // and nothing negative is written to the cache.
        return await this.redis.getOrSet<GroupMembership>(
          cacheKey,
          fetchMembership,
          MEMBERSHIP_CACHE_TTL_S,
        );
      }
      return await fetchMembership();
    } catch (err: any) {
      this.logger.warn(`IamClient getGroupMembership failed: ${(err as Error).message}`);
      return DENY;
    }
  }

  private async doGet(url: string): Promise<any> {
    return this.breaker.execute(async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), IAM_TIMEOUT_MS);

      try {
        const headers: Record<string, string> = { Accept: 'application/json' };
        if (this.internalSecret) headers['x-internal-secret'] = this.internalSecret;

        const res = await fetch(url, { signal: controller.signal, headers });

        if (!res.ok) {
          // 5xx is a transient IAM fault → throw so the breaker counts it.
          // 4xx is a definitive answer (e.g. not a member) → return null,
          // which the caller maps to DENY without tripping the breaker.
          if (res.status >= 500) throw new Error(`IAM returned ${res.status}`);
          this.logger.warn(`IamClient GET ${url} → ${res.status}`);
          return null;
        }

        const body = await res.json();
        return body?.data ?? body;
      } finally {
        clearTimeout(timer);
      }
    });
  }
}
