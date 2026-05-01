import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createHash } from 'crypto';
import { RedisService } from '@package/redis';
import { TokenLocalStore } from './token-local-store';

const MAX_ENTRIES = 10_000;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
const REDIS_KEY_PREFIX = 'auth:blacklist:';
const LOCAL_SYNC_TTL_SECONDS = 300;

@Injectable()
export class TokenBlacklistService implements OnModuleInit, OnModuleDestroy {
  private readonly localStore = new TokenLocalStore(MAX_ENTRIES);
  private cleanupInterval?: NodeJS.Timeout;

  constructor(private readonly redis: RedisService) {}

  onModuleInit(): void {
    this.cleanupInterval = setInterval(() => {
      this.localStore.cleanup();
    }, CLEANUP_INTERVAL_MS);
  }

  onModuleDestroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined;
    }
  }

  async add(token: string, ttlSeconds: number): Promise<void> {
    if (this.redis?.isEnabled()) {
      await this.redis
        .set(this.redisKey(token), '1', ttlSeconds)
        .catch(() => this.localStore.add(token, ttlSeconds));
    } else {
      this.localStore.add(token, ttlSeconds);
    }
  }

  isBlacklisted(token: string): boolean {
    return this.localStore.has(token);
  }

  async has(token: string): Promise<boolean> {
    if (this.localStore.has(token)) return true;
    if (this.redis?.isEnabled()) {
      const val = await this.redis.get(this.redisKey(token));
      if (val) {
        this.localStore.add(token, LOCAL_SYNC_TTL_SECONDS);
        return true;
      }
    }
    return false;
  }

  getStats() {
    return {
      ...this.localStore.stats(MAX_ENTRIES),
      redisEnabled: this.redis?.isEnabled() || false,
    };
  }

  private redisKey(token: string): string {
    const hash = createHash('sha256').update(token).digest('hex');
    return `${REDIS_KEY_PREFIX}${hash}`;
  }
}
