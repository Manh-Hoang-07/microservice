import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;

  constructor(private readonly config: ConfigService) {
    const url = config.get<string>('redis.url') || config.get<string>('REDIS_URL');
    if (url) {
      this.client = new Redis(url);
      this.client.on('error', (err) => {
        this.logger.error('Redis connection error', err);
        this.client = null;
      });
      this.client.on('connect', () => {
        this.logger.log('Redis connected');
      });
    } else {
      this.logger.warn('REDIS_URL not set — Redis disabled');
    }
  }

  isEnabled(): boolean {
    return this.client !== null;
  }

  async get(key: string): Promise<string | null> {
    if (!this.client) return null;
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.client) return;
    if (ttlSeconds) {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.client) return;
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    if (!this.client) return false;
    return (await this.client.exists(key)) === 1;
  }

  async hincrby(key: string, field: string, increment: number): Promise<number> {
    if (!this.client) return 0;
    return this.client.hincrby(key, field, increment);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    if (!this.client) return {};
    return this.client.hgetall(key);
  }

  async hdel(key: string, ...fields: string[]): Promise<void> {
    if (!this.client) return;
    await this.client.hdel(key, ...fields);
  }

  async hget(key: string, field: string): Promise<string | null> {
    if (!this.client) return null;
    return this.client.hget(key, field);
  }

  async hset(key: string, field: string, value: string): Promise<void> {
    if (!this.client) return;
    await this.client.hset(key, field, value);
  }

  async setnx(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
    if (!this.client) return false;
    const result = await this.client.setnx(key, value);
    if (result === 1 && ttlSeconds) {
      await this.client.expire(key, ttlSeconds);
    }
    return result === 1;
  }

  async expire(key: string, seconds: number): Promise<void> {
    if (!this.client) return;
    await this.client.expire(key, seconds);
  }

  async ttl(key: string): Promise<number> {
    if (!this.client) return -1;
    return this.client.ttl(key);
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.client) return [];
    return this.client.keys(pattern);
  }

  async incr(key: string): Promise<number> {
    if (!this.client) return 0;
    return this.client.incr(key);
  }

  async sadd(key: string, ...members: string[]): Promise<number> {
    if (!this.client) return 0;
    return this.client.sadd(key, ...members);
  }

  async smembers(key: string): Promise<string[]> {
    if (!this.client) return [];
    return this.client.smembers(key);
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
      this.logger.log('Redis disconnected');
    }
  }
}
