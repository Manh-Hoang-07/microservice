import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@package/redis';
import { decodeAssignedCodes, encodeAssignedCodes } from './rbac-assigned-codes.codec';
import { RbacId, NullableRbacId } from '../types';

const LEGACY_ASSIGNED_BITMAP_PREFIX = 'b64:v1:' as const;

@Injectable()
export class RbacCacheService implements OnModuleInit, OnModuleDestroy {
  private readonly ttlSeconds: number;
  private readonly invalidationChannel = 'rbac:invalidation';
  private readonly versionKey = 'rbac:meta';
  private readonly versionField = 'version';
  private version = 1;
  private versionLastFetch = 0;
  private readonly versionTtlMs: number;
  private subscriberCallback: ((message: string) => void) | null = null;

  constructor(
    private readonly redis: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.ttlSeconds = Number(this.configService.get('RBAC_CACHE_TTL') || 86400);
    // Default 2s — short enough that a missed pubsub message leaves the
    // window of stale auth small, long enough to avoid pummeling Redis.
    this.versionTtlMs = Number(
      this.configService.get('RBAC_CACHE_VERSION_TTL_MS') || 2000,
    );
  }

  async onModuleInit() {
    if (this.redis.isEnabled()) {
      await this.ensureVersion().catch(() => undefined);
      this.subscriberCallback = (message) => {
        try {
          const { type, version } = JSON.parse(message);
          if (
            type === 'clear_all' &&
            typeof version === 'number' &&
            Number.isFinite(version) &&
            version > 0
          ) {
            this.version = version;
            this.versionLastFetch = Date.now();
          }
        } catch {
          // intentionally empty
        }
      };
      await this.redis.subscribe(this.invalidationChannel, this.subscriberCallback);
    }
  }

  async onModuleDestroy() {
    // Detach the subscriber so its closure doesn't pin `this` across
    // hot-reload tests / multi-tenant module destruction.
    if (this.subscriberCallback) {
      await this.redis
        .unsubscribe(this.invalidationChannel, this.subscriberCallback)
        .catch(() => undefined);
      this.subscriberCallback = null;
    }
  }

  /** Tracked-keys set is namespaced per version so old generations expire on their own. */
  private trackedKeysSet(userId: RbacId, version: number): string {
    return `rbac:v${version}:u:${userId}:keys`;
  }

  private async ensureVersion(): Promise<number> {
    if (!this.redis.isEnabled()) return 1;
    if (Date.now() - this.versionLastFetch < this.versionTtlMs) return this.version;
    const meta = await this.redis.hgetall(this.versionKey);
    const parsed = Number(meta?.[this.versionField] || 1);
    this.version = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    this.versionLastFetch = Date.now();
    return this.version;
  }

  private async buildCacheKey(userId: RbacId, groupId: NullableRbacId): Promise<string> {
    const v = await this.ensureVersion();
    return groupId === null
      ? `rbac:v${v}:u:${userId}:g:system`
      : `rbac:v${v}:u:${userId}:g:${groupId}`;
  }

  async getPermissions(
    userId: RbacId,
    groupId: NullableRbacId,
  ): Promise<{ codes: string[]; cached: boolean }> {
    if (!this.redis.isEnabled()) return { codes: [], cached: false };
    const key = await this.buildCacheKey(userId, groupId);
    const raw = await this.redis.get(key);
    if (raw) {
      if (typeof raw === 'string' && raw.startsWith(LEGACY_ASSIGNED_BITMAP_PREFIX)) {
        await this.redis.del(key);
        return { codes: [], cached: false };
      }
      const decoded = decodeAssignedCodes(raw);
      if (decoded) return { codes: decoded, cached: true };
      await this.redis.del(key);
    }
    return { codes: [], cached: false };
  }

  async setPermissions(userId: RbacId, groupId: NullableRbacId, codes: string[]) {
    if (!this.redis.isEnabled()) return;
    const v = await this.ensureVersion();
    const key =
      groupId === null
        ? `rbac:v${v}:u:${userId}:g:system`
        : `rbac:v${v}:u:${userId}:g:${groupId}`;
    await this.redis.multi([
      ['SET', key, encodeAssignedCodes(codes), 'EX', this.ttlSeconds],
      ['SADD', this.trackedKeysSet(userId, v), key],
      ['EXPIRE', this.trackedKeysSet(userId, v), this.ttlSeconds],
    ]);
  }

  async clearUserCache(userId: RbacId, groupId: NullableRbacId) {
    if (!this.redis.isEnabled()) return;
    const key = await this.buildCacheKey(userId, groupId);
    await this.redis.del(key);
  }

  /**
   * Atomically rename the tracked-set so any concurrent setPermissions cannot
   * leak entries past the clear; then unlink the snapshot's keys in bulk.
   */
  async clearAllUserCaches(userId: RbacId) {
    if (!this.redis.isEnabled()) return;
    const v = await this.ensureVersion();
    const trackedSet = this.trackedKeysSet(userId, v);
    const snapshotKey = `${trackedSet}:clear:${Date.now()}`;
    try {
      await this.redis.multi([['RENAME', trackedSet, snapshotKey]]);
    } catch {
      // No tracked entries — nothing to clear.
      await this.redis.publish(
        this.invalidationChannel,
        JSON.stringify({ type: 'user_all', userId: String(userId) }),
      );
      return;
    }
    const keys = await this.redis.smembers(snapshotKey);
    if (keys.length) await this.redis.deleteMany(keys);
    await this.redis.del(snapshotKey);
    await this.redis.publish(
      this.invalidationChannel,
      JSON.stringify({ type: 'user_all', userId: String(userId) }),
    );
  }

  /**
   * Cache version bump — every read computes its key under the new version,
   * so any concurrent stale write lands on the previous generation key
   * (orphaned, TTL'd out).
   */
  async bumpVersion(): Promise<void> {
    if (!this.redis.isEnabled()) return;
    const next = await this.redis.hincrby(this.versionKey, this.versionField, 1);
    this.version = Number(next) > 0 ? Number(next) : this.version + 1;
    this.versionLastFetch = Date.now();
    await this.redis.publish(
      this.invalidationChannel,
      JSON.stringify({ type: 'clear_all', version: this.version }),
    );
  }
}
