import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { createHash } from 'crypto';
import { RedisService } from './redis.service';
import { TokenLocalStore } from './token-local-store';

const MAX_ENTRIES = 10_000;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
const REDIS_KEY_PREFIX = 'auth:blacklist:';
const LOCAL_SYNC_TTL_SECONDS = 300;

@Injectable()
export class TokenBlacklistService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TokenBlacklistService.name);
  private readonly localStore = new TokenLocalStore(MAX_ENTRIES);
  private cleanupInterval?: NodeJS.Timeout;

  constructor(private readonly redis: RedisService) {}

  onModuleInit(): void {
    this.cleanupInterval = setInterval(() => {
      const removed = this.localStore.cleanup();
      if (removed > 0) {
        this.logger.log(
          `Token blacklist cleanup: removed ${removed} expired entries. ` +
            `Current size: ${this.localStore.size}/${MAX_ENTRIES}`,
        );
      }
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
