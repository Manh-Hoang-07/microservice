import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../../security/services/redis.service';
import { decodeAssignedCodes, encodeAssignedCodes } from './rbac-assigned-codes.codec';
import { RbacId, NullableRbacId } from '../constants/rbac.constants';

const LEGACY_ASSIGNED_BITMAP_PREFIX = 'b64:v1:' as const;

@Injectable()
export class RbacCacheService implements OnModuleInit {
  private readonly ttlSeconds: number;
  private readonly invalidationChannel = 'rbac:invalidation';
  private readonly versionKey = 'rbac:meta';
  private readonly versionField = 'version';
  private version = 1;
  private versionLastFetch = 0;
  private readonly versionTtlMs = 30000;

  constructor(
    private readonly redis: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.ttlSeconds = Number(this.configService.get('RBAC_CACHE_TTL') || 86400);
  }

  async onModuleInit() {
    if (this.redis.isEnabled()) {
      await this.ensureVersion().catch(() => undefined);
      await this.redis.subscribe(this.invalidationChannel, (message) => {
        try {
          const { version } = JSON.parse(message);
          if (typeof version === 'number' && Number.isFinite(version) && version > 0) {
            this.version = version;
            this.versionLastFetch = Date.now();
          }
        } catch {
          // intentionally empty
        }
      });
    }
  }

  private async ensureVersion(): Promise<number> {
    if (!this.redis.isEnabled()) return 1;
    if (Date.now() - this.versionLastFetch < this.versionTtlMs) {
      return this.version;
    }
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
    const key = await this.buildCacheKey(userId, groupId);
    if (!this.redis.isEnabled()) return { codes: [], cached: false };
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
    const key = await this.buildCacheKey(userId, groupId);
    if (!this.redis.isEnabled()) return;
    const value = encodeAssignedCodes(codes);
    await this.redis.set(key, value, this.ttlSeconds);
    await this.redis.trackKey(Number(userId), key);
    await this.redis.publish(
      this.invalidationChannel,
      JSON.stringify({ type: 'specific_key', key, version: this.version }),
    );
  }

  async clearUserCache(userId: RbacId, groupId: NullableRbacId) {
    const key = await this.buildCacheKey(userId, groupId);
    await this.redis.del(key);
  }

  async clearAllUserCaches(userId: RbacId) {
    if (!this.redis.isEnabled()) return;
    const keys = await this.redis.getTrackedKeys(Number(userId));
    for (const k of keys) await this.redis.del(k);
    await this.redis.clearTrackedKeys(Number(userId));
    await this.redis.publish(
      this.invalidationChannel,
      JSON.stringify({ type: 'user_all', userId }),
    );
  }

  async bumpVersion(): Promise<void> {
    if (this.redis.isEnabled()) {
      const next = await this.redis.hincrby(this.versionKey, this.versionField, 1);
      this.version = Number(next) > 0 ? Number(next) : this.version + 1;
      this.versionLastFetch = Date.now();
      await this.redis.publish(
        this.invalidationChannel,
        JSON.stringify({ type: 'clear_all', version: this.version }),
      );
    }
  }
}
