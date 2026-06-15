import { Optional } from '@nestjs/common';
import { RedisService } from './redis.service';
import { bigintReplacer, buildVariantSuffix } from './cache-key.util';

/**
 * Base class for public (read-mostly) services that cache list/detail payloads
 * in Redis with:
 *
 *  - **Dynamic cache keys** — pagination/sort/filter variants each get their own
 *    key (via {@link buildVariantSuffix}), so different queries never collide.
 *  - **Version-based invalidation** — instead of deleting individual keys, each
 *    entity owns a monotonically increasing version counter. Writers bump it
 *    (`incr`), readers embed the current version in the key. Stale entries are
 *    simply never read again and expire via TTL. This mirrors the RBAC
 *    `rbac:meta.version` strategy already used in the platform.
 *  - **BigInt-safe serialisation** — every `JSON.stringify` uses
 *    {@link bigintReplacer} so cache writes never throw and silently no-op.
 *  - **In-flight de-duplication** — concurrent loads of the same key share one
 *    promise (stampede protection), keyed by the full resolved key.
 *
 * Subclasses set {@link cacheEntity} (e.g. `'banners'`), optionally override
 * {@link cacheNamespace} (per-service prefix), and use {@link cachedList} /
 * {@link cachedDetail} for reads and {@link invalidate} for writes.
 */
export abstract class CachedService {
  /** Logical entity name, e.g. `banners`, `faq`. Used to namespace keys. */
  protected abstract readonly cacheEntity: string;

  /**
   * Key prefix for cached payloads. Neutral default — each service overrides it
   * with its own namespace (e.g. `'cms:public'`, `'config:public'`).
   */
  protected readonly cacheNamespace: string = 'cache';

  private readonly inflight = new Map<string, Promise<any>>();

  constructor(@Optional() protected readonly redis?: RedisService) {}

  private get versionKey(): string {
    return `${this.cacheNamespace}:${this.cacheEntity}:ver`;
  }

  private isCacheEnabled(): boolean {
    return !!this.redis?.isEnabled?.();
  }

  /** Current version for this entity (0 when Redis is unavailable). */
  protected async getVersion(): Promise<number> {
    if (!this.isCacheEnabled()) return 0;
    const raw = await this.redis!.get(this.versionKey).catch(() => null);
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) ? parsed : 0;
  }

  /**
   * Invalidate all cached variants for this entity by bumping its version
   * counter. Existing keys (which embed the old version) become unreachable and
   * lapse via TTL. Call from create/update/delete in admin services.
   */
  async invalidate(): Promise<void> {
    if (!this.isCacheEnabled()) return;
    await this.redis!.incr(this.versionKey).catch(() => {});
  }

  /** Build a fully-qualified, version-aware cache key for a list variant. */
  protected async buildListKey(filter: object, options: object): Promise<string> {
    const version = await this.getVersion();
    const suffix = buildVariantSuffix({ filter, options });
    return `${this.cacheNamespace}:${this.cacheEntity}:list:v${version}:${suffix}`;
  }

  /** Build a fully-qualified, version-aware cache key for a single detail. */
  protected async buildDetailKey(id: string | number | bigint): Promise<string> {
    const version = await this.getVersion();
    return `${this.cacheNamespace}:${this.cacheEntity}:detail:v${version}:${id}`;
  }

  /**
   * Read-through cache with in-flight de-duplication. The loader runs at most
   * once per key across concurrent callers.
   */
  protected async getOrSet<T>(key: string, ttl: number, loader: () => Promise<T>): Promise<T> {
    if (this.isCacheEnabled()) {
      const cached = await this.redis!.get(key).catch(() => null);
      if (cached) return JSON.parse(cached) as T;
    }

    const existing = this.inflight.get(key) as Promise<T> | undefined;
    if (existing) return existing;

    const promise = loader()
      .then(async (result) => {
        this.inflight.delete(key);
        if (this.isCacheEnabled()) {
          await this.redis!
            .set(key, JSON.stringify(result, bigintReplacer), ttl)
            .catch(() => {});
        }
        return result;
      })
      .catch((err) => {
        this.inflight.delete(key);
        throw err;
      });

    this.inflight.set(key, promise);
    return promise;
  }

  /** Convenience: build a version-aware list key then read through the cache. */
  protected async cachedList<T>(
    filter: object,
    options: object,
    ttl: number,
    loader: () => Promise<T>,
  ): Promise<T> {
    const key = await this.buildListKey(filter, options);
    return this.getOrSet(key, ttl, loader);
  }

  /** Convenience: build a version-aware detail key then read through the cache. */
  protected async cachedDetail<T>(
    id: string | number | bigint,
    ttl: number,
    loader: () => Promise<T>,
  ): Promise<T> {
    const key = await this.buildDetailKey(id);
    return this.getOrSet(key, ttl, loader);
  }
}
