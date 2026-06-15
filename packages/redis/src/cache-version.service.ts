import { Injectable, Optional } from '@nestjs/common';
import { RedisService } from './redis.service';

/**
 * Version-counter cache invalidation, shared by every service.
 *
 * Provided globally by {@link RedisModule} — inject it directly; no per-service
 * subclass is needed. Callers pass the FULL, namespaced key
 * (e.g. `'cms:public:banners'`, `'comic:public:list'`); the counter lives at
 * `<key>:ver`, matching the key shape {@link CachedService} reads.
 *
 *  - Writers `bump()` on create/update/delete — a single `incr` invalidates
 *    every cached query variant.
 *  - Readers embed `getVersion()` in their cache keys; old variants become
 *    unreachable and lapse via TTL (no SCAN/KEYS needed).
 */
@Injectable()
export class CacheVersionService {
  constructor(@Optional() private readonly redis?: RedisService) {}

  private versionKey(key: string): string {
    return `${key}:ver`;
  }

  /** Bump the version counter for a key, invalidating all its cached variants. */
  async bump(key: string): Promise<void> {
    if (!this.redis?.isEnabled?.()) return;
    await this.redis.incr(this.versionKey(key)).catch(() => {});
  }

  /** Current version counter for a key (0 when Redis is unavailable). */
  async getVersion(key: string): Promise<number> {
    if (!this.redis?.isEnabled?.()) return 0;
    const raw = await this.redis.get(this.versionKey(key)).catch(() => null);
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
