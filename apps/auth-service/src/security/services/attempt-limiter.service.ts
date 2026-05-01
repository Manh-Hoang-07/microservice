import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@package/redis';

export interface AttemptLimiterOverrides {
  maxAttempts?: number;
  lockoutSeconds?: number;
  windowSeconds?: number;
}

@Injectable()
export class AttemptLimiterService {
  private readonly defaultMaxAttempts: number;
  private readonly defaultLockoutSeconds: number;
  private readonly defaultWindowSeconds: number;

  constructor(
    private readonly redis: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.defaultMaxAttempts = Number(
      this.configService.get<number>('SECURITY_ATTEMPT_MAX', 5),
    );
    this.defaultLockoutSeconds = Number(
      this.configService.get<number>('SECURITY_ATTEMPT_LOCKOUT_SECONDS', 1800),
    );
    this.defaultWindowSeconds = Number(
      this.configService.get<number>('SECURITY_ATTEMPT_WINDOW_SECONDS', 900),
    );
  }

  async check(
    scope: string,
    identifier: string,
  ): Promise<{ isLocked: boolean; remainingMinutes?: number }> {
    if (!this.redis.isEnabled()) return { isLocked: false };
    try {
      const key = `${scope}:${identifier}`;
      const data = await this.redis.get(key);
      if (!data) return { isLocked: false };
      const info = JSON.parse(data) as { attempts?: number; lockedUntil?: number };
      const now = Math.floor(Date.now() / 1000);
      if (info.lockedUntil && info.lockedUntil > now) {
        const remaining = Math.ceil((info.lockedUntil - now) / 60);
        return { isLocked: true, remainingMinutes: remaining };
      }
      if (info.lockedUntil && info.lockedUntil <= now) {
        await this.redis.del(`${scope}:${identifier}`);
      }
      return { isLocked: false };
    } catch {
      return { isLocked: false };
    }
  }

  async add(
    scope: string,
    identifier: string,
    overrides?: AttemptLimiterOverrides,
  ): Promise<void> {
    if (!this.redis.isEnabled()) return;
    try {
      const key = `${scope}:${identifier}`;
      const data = await this.redis.get(key);
      const now = Math.floor(Date.now() / 1000);
      let attempts = 0;
      let lockedUntil = 0;
      if (data) {
        const info = JSON.parse(data) as { attempts?: number; lockedUntil?: number };
        if (info.lockedUntil && info.lockedUntil > now) return;
        attempts = info.attempts || 0;
      }
      const maxAttempts = overrides?.maxAttempts ?? this.defaultMaxAttempts;
      const lockoutSeconds = overrides?.lockoutSeconds ?? this.defaultLockoutSeconds;
      const windowSeconds = overrides?.windowSeconds ?? this.defaultWindowSeconds;
      attempts += 1;
      const isLocked = attempts >= maxAttempts;
      if (isLocked) lockedUntil = now + lockoutSeconds;
      const ttl = isLocked ? lockoutSeconds : windowSeconds;
      await this.redis.set(key, JSON.stringify({ attempts, lockedUntil }), ttl);
    } catch {
      // ignore
    }
  }

  async reset(scope: string, identifier: string): Promise<void> {
    if (!this.redis.isEnabled()) return;
    try {
      await this.redis.del(`${scope}:${identifier}`);
    } catch {
      // ignore
    }
  }
}
