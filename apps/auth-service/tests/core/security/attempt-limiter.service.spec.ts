// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ServiceUnavailableException } from '@nestjs/common';
import { AttemptLimiterService } from '../../../src/core/security/services/attempt-limiter.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRedis(overrides: Partial<Record<'isEnabled' | 'get' | 'set' | 'del', jest.Mock>> = {}) {
  return {
    isEnabled: overrides.isEnabled ?? jest.fn().mockReturnValue(true),
    get: overrides.get ?? jest.fn().mockResolvedValue(null),
    set: overrides.set ?? jest.fn().mockResolvedValue('OK'),
    del: overrides.del ?? jest.fn().mockResolvedValue(1),
  };
}

function makeConfig(values: Record<string, number> = {}) {
  return {
    get: jest.fn((key: string, defaultVal: number) => values[key] ?? defaultVal),
  };
}

function nowEpoch(): number {
  return Math.floor(Date.now() / 1000);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AttemptLimiterService', () => {
  // ------------------------------------------------------------------
  // check()
  // ------------------------------------------------------------------
  describe('check()', () => {
    it('returns not locked when no data in Redis', async () => {
      const redis = makeRedis();
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      const result = await service.check('login', 'user@test.com');

      expect(result).toEqual({ isLocked: false });
      expect(redis.get).toHaveBeenCalledWith('login:user@test.com');
    });

    it('returns locked with remaining minutes when lockedUntil is in the future', async () => {
      const futureTs = nowEpoch() + 600; // 10 minutes from now
      const redis = makeRedis({
        get: jest.fn().mockResolvedValue(JSON.stringify({ attempts: 5, lockedUntil: futureTs })),
      });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      const result = await service.check('login', 'user@test.com');

      expect(result.isLocked).toBe(true);
      expect(result.remainingMinutes).toBeGreaterThan(0);
      expect(result.remainingMinutes).toBeLessThanOrEqual(10);
    });

    it('returns not locked and cleans up when lockout expired', async () => {
      const pastTs = nowEpoch() - 60; // 1 minute ago
      const redis = makeRedis({
        get: jest.fn().mockResolvedValue(JSON.stringify({ attempts: 5, lockedUntil: pastTs })),
      });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      const result = await service.check('login', 'user@test.com');

      expect(result).toEqual({ isLocked: false });
      expect(redis.del).toHaveBeenCalledWith('login:user@test.com');
    });

    it('returns not locked when Redis disabled', async () => {
      const redis = makeRedis({ isEnabled: jest.fn().mockReturnValue(false) });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      const result = await service.check('login', 'user@test.com');

      expect(result).toEqual({ isLocked: false });
      expect(redis.get).not.toHaveBeenCalled();
    });

    it('fail-closed: throws ServiceUnavailableException on Redis error', async () => {
      const redis = makeRedis({
        get: jest.fn().mockRejectedValue(new Error('connection lost')),
      });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      await expect(service.check('login', 'user@test.com')).rejects.toThrow(
        ServiceUnavailableException,
      );
    });

    it('handles corrupt JSON data gracefully', async () => {
      const redis = makeRedis({
        get: jest.fn().mockResolvedValue('not-valid-json{{{'),
      });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      const result = await service.check('login', 'user@test.com');

      expect(result).toEqual({ isLocked: false });
      expect(redis.del).toHaveBeenCalledWith('login:user@test.com');
    });
  });

  // ------------------------------------------------------------------
  // add()
  // ------------------------------------------------------------------
  describe('add()', () => {
    it('increments attempts and stores in Redis', async () => {
      const redis = makeRedis();
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      await service.add('login', 'user@test.com');

      expect(redis.set).toHaveBeenCalledTimes(1);
      const [key, value, ttl] = redis.set.mock.calls[0];
      expect(key).toBe('login:user@test.com');
      const parsed = JSON.parse(value);
      expect(parsed.attempts).toBe(1);
      expect(parsed.lockedUntil).toBe(0);
      // default windowSeconds = 900
      expect(ttl).toBe(900);
    });

    it('locks when reaching max attempts', async () => {
      const redis = makeRedis({
        get: jest.fn().mockResolvedValue(JSON.stringify({ attempts: 4, lockedUntil: 0 })),
      });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      await service.add('login', 'user@test.com');

      expect(redis.set).toHaveBeenCalledTimes(1);
      const [, value, ttl] = redis.set.mock.calls[0];
      const parsed = JSON.parse(value);
      expect(parsed.attempts).toBe(5); // 4 + 1 = maxAttempts
      expect(parsed.lockedUntil).toBeGreaterThan(0);
      // default lockoutSeconds = 1800
      expect(ttl).toBe(1800);
    });

    it('does nothing when already locked', async () => {
      const futureTs = nowEpoch() + 600;
      const redis = makeRedis({
        get: jest.fn().mockResolvedValue(JSON.stringify({ attempts: 5, lockedUntil: futureTs })),
      });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      await service.add('login', 'user@test.com');

      expect(redis.set).not.toHaveBeenCalled();
    });

    it('fail-closed: throws on Redis get error', async () => {
      const redis = makeRedis({
        get: jest.fn().mockRejectedValue(new Error('connection lost')),
      });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      await expect(service.add('login', 'user@test.com')).rejects.toThrow(
        ServiceUnavailableException,
      );
    });

    it('fail-closed: throws on Redis set error', async () => {
      const redis = makeRedis({
        set: jest.fn().mockRejectedValue(new Error('connection lost')),
      });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      await expect(service.add('login', 'user@test.com')).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });

  // ------------------------------------------------------------------
  // reset()
  // ------------------------------------------------------------------
  describe('reset()', () => {
    it('deletes key from Redis', async () => {
      const redis = makeRedis();
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      await service.reset('login', 'user@test.com');

      expect(redis.del).toHaveBeenCalledWith('login:user@test.com');
    });

    it('does nothing when Redis disabled', async () => {
      const redis = makeRedis({ isEnabled: jest.fn().mockReturnValue(false) });
      const service = new AttemptLimiterService(redis as any, makeConfig() as any);

      await service.reset('login', 'user@test.com');

      expect(redis.del).not.toHaveBeenCalled();
    });
  });
});
