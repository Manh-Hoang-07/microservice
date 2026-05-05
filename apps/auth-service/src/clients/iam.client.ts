import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCircuitBreaker } from '@package/circuit-breaker';
import { RedisService } from '@package/redis';
import type { CircuitBreakerPolicy } from 'cockatiel';

const IAM_TIMEOUT_MS = 5_000;
const RBAC_CACHE_TTL_S = 60;

@Injectable()
export class IamClient implements OnModuleInit {
  private readonly baseUrl: string;
  private readonly internalSecret: string;
  private breaker!: CircuitBreakerPolicy;

  constructor(
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {
    this.baseUrl = config.get<string>('IAM_INTERNAL_URL', '');
    this.internalSecret =
      config.get<string>('INTERNAL_API_SECRET') ||
      config.get<string>('app.internalApiSecret') ||
      '';
  }

  onModuleInit() {
    this.breaker = createCircuitBreaker({
      halfOpenAfterMs: 10_000,
      maxConsecutiveFailures: 5,
    });
    this.breaker.onBreak(() => {});
  }

  /** Returns true if IAM_INTERNAL_URL is configured */
  isConfigured(): boolean {
    return !!this.baseUrl;
  }

  /**
   * Check if user has all required permissions.
   * Uses Redis cache (60s TTL) → circuit breaker → IAM HTTP call.
   */
  async checkPermissions(
    userId: string,
    permissions: string[],
    groupId?: string,
  ): Promise<boolean> {
    // Cache first
    const cacheKey = `rbac:${userId}:${permissions.sort().join(',')}:${groupId ?? ''}`;
    try {
      const cached = await this.redis.get(cacheKey);
      if (cached !== null && cached !== undefined) {
        return (JSON.parse(cached) as { allowed: boolean }).allowed;
      }
    } catch { /* Redis unavailable — fall through */ }

    // Call IAM
    const data = await this.doPost(`${this.baseUrl}/internal/rbac/check`, {
      userId,
      groupId,
      permissions,
    });

    const allowed = data?.allowed === true;

    // Cache result
    try {
      await this.redis.set(cacheKey, JSON.stringify({ allowed }), RBAC_CACHE_TTL_S);
    } catch { /* not critical */ }

    return allowed;
  }

  private async doPost(url: string, body: Record<string, unknown>): Promise<any> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IAM_TIMEOUT_MS);

    try {
      return await this.breaker.execute(async () => {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (this.internalSecret) headers['x-internal-secret'] = this.internalSecret;

        const res = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status >= 500) throw new Error(`IAM returned ${res.status}`);
          return { allowed: false };
        }

        return await res.json();
      });
    } catch (err) {
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
