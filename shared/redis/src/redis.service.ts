import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;
  private subscriberClient: Redis | null = null;
  private readonly channelCallbacks = new Map<string, Array<(message: string) => void>>();
  private enabled = false;

  constructor(private readonly config: ConfigService) {}

  private getRedisUrl(): string | undefined {
    return this.config.get<string>('redis.url') || this.config.get<string>('REDIS_URL');
  }

  async onModuleInit(): Promise<void> {
    const url = this.getRedisUrl();
    if (!url) {
      this.logger.warn('REDIS_URL not set — Redis disabled');
      return;
    }
    try {
      this.client = new Redis(url, { lazyConnect: true, enableOfflineQueue: false });
      this.client.on('error', (err) => {
        this.logger.error('Redis connection error', err);
      });
      this.client.on('connect', () => {
        this.logger.log('Redis connected');
      });
      await this.client.connect();
      this.enabled = true;
    } catch (err) {
      this.logger.error('Redis connect failed', err as Error);
      this.client = null;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client?.quit().catch(() => undefined);
    await this.subscriberClient?.quit().catch(() => undefined);
    this.client = null;
    this.subscriberClient = null;
  }

  isEnabled(): boolean {
    return this.enabled && this.client !== null;
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
    return (await this.client.exists(key)) > 0;
  }

  async hincrby(key: string, field: string, increment: number): Promise<number> {
    if (!this.client) return 0;
    return this.client.hincrby(key, field, increment);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    if (!this.client) return {};
    return (await this.client.hgetall(key)) || {};
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

  async publish(channel: string, message: string): Promise<void> {
    if (!this.client) return;
    await this.client.publish(channel, message);
  }

  async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
    const url = this.getRedisUrl();
    if (!url) return;
    const callbacks = this.channelCallbacks.get(channel) || [];
    callbacks.push(callback);
    this.channelCallbacks.set(channel, callbacks);
    try {
      if (!this.subscriberClient) {
        this.subscriberClient = new Redis(url);
        this.subscriberClient.on('message', (ch: string, msg: string) => {
          (this.channelCallbacks.get(ch) || []).forEach((cb) => cb(msg));
        });
      }
      await this.subscriberClient.subscribe(channel);
    } catch {
      // ignore subscriber failure
    }
  }
}
