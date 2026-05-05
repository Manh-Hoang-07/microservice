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

  private createClient(url: string): Redis {
    return new Redis(url, {
      lazyConnect: true,
      enableOfflineQueue: true,
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => Math.min(times * 200, 5_000),
      connectTimeout: 10_000,
      reconnectOnError: (err) => {
        const targetErrors = ['READONLY', 'ECONNRESET', 'ETIMEDOUT'];
        return targetErrors.some((t) => err.message.includes(t));
      },
    });
  }

  async onModuleInit(): Promise<void> {
    const url = this.getRedisUrl();
    if (!url) {
      this.logger.warn('REDIS_URL not set — Redis disabled');
      return;
    }
    try {
      this.client = this.createClient(url);
      this.client.on('error', (err) => {
        this.logger.error('Redis connection error', err);
      });
      this.client.on('connect', () => {
        this.logger.log('Redis connected');
      });
      this.client.on('reconnecting', (delay: number) => {
        this.logger.warn(`Redis reconnecting in ${delay}ms`);
      });
      await this.client.connect();
      this.enabled = true;
    } catch (err) {
      this.logger.error('Redis connect failed', err as Error);
      this.client = null;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client?.quit().catch((err) => {
      this.logger.warn(`Redis client quit error: ${(err as Error).message}`);
    });
    await this.subscriberClient?.quit().catch((err) => {
      this.logger.warn(`Redis subscriber quit error: ${(err as Error).message}`);
    });
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
    const result = ttlSeconds
      ? await this.client.set(key, value, 'EX', ttlSeconds, 'NX')
      : await this.client.set(key, value, 'NX');
    return result === 'OK';
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
    const results: string[] = [];
    let cursor = '0';
    do {
      const [nextCursor, keys] = await this.client.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = nextCursor;
      results.push(...keys);
    } while (cursor !== '0');
    return results;
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

  async srem(key: string, ...members: string[]): Promise<number> {
    if (!this.client) return 0;
    return this.client.srem(key, ...members);
  }

  async getdel(key: string): Promise<string | null> {
    if (!this.client) return null;
    return (this.client as any).getdel
      ? (this.client as any).getdel(key)
      : this.client.call('GETDEL', key) as Promise<string | null>;
  }

  async multi(commands: Array<[string, ...(string | number)[]]>): Promise<unknown[]> {
    if (!this.client) return [];
    let pipeline = this.client.multi();
    for (const [cmd, ...args] of commands) {
      pipeline = (pipeline as any)[cmd.toLowerCase()](...args);
    }
    const result = await pipeline.exec();
    if (!result) return [];
    return result.map(([err, val]) => {
      if (err) throw err;
      return val;
    });
  }

  async flushDb(): Promise<void> {
    if (!this.client) return;
    await this.client.flushdb();
  }

  async deleteMany(keys: string[]): Promise<void> {
    if (!this.client || !keys.length) return;
    await this.client.del(...keys);
  }

  async rename(source: string, destination: string): Promise<void> {
    if (!this.client) return;
    await this.client.rename(source, destination);
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
        this.subscriberClient = this.createClient(url);
        await this.subscriberClient.connect();
        this.subscriberClient.on('message', (ch: string, msg: string) => {
          (this.channelCallbacks.get(ch) || []).forEach((cb) => cb(msg));
        });
      }
      await this.subscriberClient.subscribe(channel);
    } catch {
      // ignore subscriber failure
    }
  }

  async unsubscribe(channel: string, callback?: (message: string) => void): Promise<void> {
    const callbacks = this.channelCallbacks.get(channel);
    if (!callbacks?.length) return;
    if (callback) {
      const idx = callbacks.indexOf(callback);
      if (idx >= 0) callbacks.splice(idx, 1);
    } else {
      callbacks.length = 0;
    }
    if (!callbacks.length) {
      this.channelCallbacks.delete(channel);
      try {
        await this.subscriberClient?.unsubscribe(channel);
      } catch {
        // best-effort cleanup
      }
    }
  }
}
