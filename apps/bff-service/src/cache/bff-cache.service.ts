import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

const KEY_PREFIX = 'bff:';

@Injectable()
export class BffCacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BffCacheService.name);
  private client: Redis | null = null;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const url = this.config.get<string>('bff.redisUrl', '');
    if (!url) {
      this.logger.warn('BFF_REDIS_URL not set — caching disabled');
      return;
    }
    try {
      this.client = new Redis(url, { lazyConnect: true, maxRetriesPerRequest: 1 });
      await this.client.connect();
      this.logger.log(`BFF Redis connected to ${url}`);
    } catch (err) {
      this.logger.warn(`BFF Redis connection failed: ${(err as Error).message} — caching disabled`);
      this.client = null;
    }
  }

  async onModuleDestroy() {
    await this.client?.quit().catch(() => null);
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client) return null;
    try {
      const raw = await this.client.get(`${KEY_PREFIX}${key}`);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  async set(key: string, value: unknown, ttlSeconds = 120): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.setex(`${KEY_PREFIX}${key}`, ttlSeconds, JSON.stringify(value));
    } catch {
      // non-critical — cache miss on next request
    }
  }

  async del(key: string): Promise<void> {
    if (!this.client) return;
    await this.client.del(`${KEY_PREFIX}${key}`).catch(() => null);
  }

  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttlSeconds = 120,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) return cached;
    const value = await factory();
    await this.set(key, value, ttlSeconds);
    return value;
  }

  get isEnabled(): boolean {
    return this.client !== null;
  }
}
