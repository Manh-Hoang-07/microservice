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

  /**
   * Atomic set-if-not-exists with optional TTL. Single Redis round trip via
   * `SET key value [EX ttl] NX` — safer than `SETNX` + `EXPIRE` because a
   * crash between the two commands would have left the key without a TTL,
   * making the lock permanent.
   */
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

  async srem(key: string, ...members: string[]): Promise<number> {
    if (!this.client) return 0;
    return this.client.srem(key, ...members);
  }

  /**
   * Atomic GET + DEL. Returns the previous value or null. Requires Redis >= 6.2.
   */
  async getdel(key: string): Promise<string | null> {
    if (!this.client) return null;
    return (this.client as any).getdel
      ? (this.client as any).getdel(key)
      : this.client.call('GETDEL', key) as Promise<string | null>;
  }

  /**
   * Run an atomic Redis transaction (MULTI/EXEC). Returns array of results
   * or throws on connection failure.
   */
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

  /**
   * Atomically delete tracked keys + the tracked-set in a single round trip.
   */
  async deleteMany(keys: string[]): Promise<void> {
    if (!this.client || !keys.length) return;
    await this.client.del(...keys);
  }

  /**
   * Atomic RENAME. Throws when the source key does not exist; callers should
   * wrap in try/catch to treat "missing source" as a no-op.
   */
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

  /**
   * Detach a callback from a pubsub channel. When the last callback for a
   * channel is removed, also unsubscribes the underlying client. Used by
   * services that subscribe in `onModuleInit` and need to clean up in
   * `onModuleDestroy` — otherwise the closure retains `this` and prevents
   * GC of the module during hot-reload tests.
   */
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
