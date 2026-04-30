import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis | null = null;
  private subscriberClient: Redis | null = null;
  private readonly channelCallbacks = new Map<string, Array<(message: string) => void>>();
  private enabled = false;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const redisUrl = this.config.get<string>('REDIS_URL');
    if (!redisUrl) return;
    try {
      this.client = new Redis(redisUrl, { lazyConnect: true, enableOfflineQueue: false });
      await this.client.connect();
      this.enabled = true;
    } catch {
      this.client = null;
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      await this.client.quit().catch(() => undefined);
    }
    if (this.subscriberClient) {
      await this.subscriberClient.quit().catch(() => undefined);
    }
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

  async hgetall(key: string): Promise<Record<string, string>> {
    if (!this.client) return {};
    return (await this.client.hgetall(key)) || {};
  }

  async hincrby(key: string, field: string, increment: number): Promise<number> {
    if (!this.client) return 0;
    return this.client.hincrby(key, field, increment);
  }

  async sadd(key: string, ...values: string[]): Promise<void> {
    if (!this.client) return;
    await this.client.sadd(key, ...values);
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
    const redisUrl = this.config.get<string>('REDIS_URL');
    if (!redisUrl) return;
    const callbacks = this.channelCallbacks.get(channel) || [];
    callbacks.push(callback);
    this.channelCallbacks.set(channel, callbacks);
    try {
      if (!this.subscriberClient) {
        this.subscriberClient = new Redis(redisUrl);
        this.subscriberClient.on('message', (ch: string, msg: string) => {
          const cbs = this.channelCallbacks.get(ch) || [];
          cbs.forEach((cb) => cb(msg));
        });
      }
      await this.subscriberClient.subscribe(channel);
    } catch {
      // ignore subscriber failure
    }
  }

  async trackKey(userId: number, key: string): Promise<void> {
    await this.sadd(`rbac:u:${userId}:keys`, key);
  }

  async getTrackedKeys(userId: number): Promise<string[]> {
    return this.smembers(`rbac:u:${userId}:keys`);
  }

  async clearTrackedKeys(userId: number): Promise<void> {
    await this.del(`rbac:u:${userId}:keys`);
  }
}
