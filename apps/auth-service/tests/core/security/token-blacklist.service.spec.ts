// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { createHash } from 'crypto';
import { TokenBlacklistService } from '../../../src/core/security/services/token-blacklist.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function redisKey(token: string): string {
  const hash = createHash('sha256').update(token).digest('hex');
  return `auth:blacklist:${hash}`;
}

function makeRedis(overrides: Partial<Record<'isEnabled' | 'get' | 'set' | 'del', jest.Mock>> = {}) {
  return {
    isEnabled: overrides.isEnabled ?? jest.fn().mockReturnValue(true),
    get: overrides.get ?? jest.fn().mockResolvedValue(null),
    set: overrides.set ?? jest.fn().mockResolvedValue('OK'),
    del: overrides.del ?? jest.fn().mockResolvedValue(1),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('TokenBlacklistService', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  // ------------------------------------------------------------------
  // add()
  // ------------------------------------------------------------------
  describe('add()', () => {
    it('stores in Redis when enabled', async () => {
      const redis = makeRedis();
      const service = new TokenBlacklistService(redis as any);

      await service.add('my-token', 3600);

      expect(redis.set).toHaveBeenCalledWith(redisKey('my-token'), '1', 3600);
    });

    it('falls back to local store when Redis fails', async () => {
      const redis = makeRedis({
        set: jest.fn().mockRejectedValue(new Error('connection lost')),
      });
      const service = new TokenBlacklistService(redis as any);

      await service.add('my-token', 3600);

      // Should have fallen back to local store
      expect(service.isBlacklisted('my-token')).toBe(true);
    });

    it('stores in local store when Redis disabled', async () => {
      const redis = makeRedis({ isEnabled: jest.fn().mockReturnValue(false) });
      const service = new TokenBlacklistService(redis as any);

      await service.add('my-token', 3600);

      expect(redis.set).not.toHaveBeenCalled();
      expect(service.isBlacklisted('my-token')).toBe(true);
    });
  });

  // ------------------------------------------------------------------
  // has()
  // ------------------------------------------------------------------
  describe('has()', () => {
    it('returns true from local store (fast path)', async () => {
      const redis = makeRedis();
      const service = new TokenBlacklistService(redis as any);

      // Seed local store via add with Redis disabled for this seed
      const disabledRedis = makeRedis({ isEnabled: jest.fn().mockReturnValue(false) });
      const seedService = new TokenBlacklistService(disabledRedis as any);
      await seedService.add('my-token', 3600);

      // Now test with a service that has the token in local store
      // We need to add to local store via the fallback path
      const failRedis = makeRedis({
        set: jest.fn().mockRejectedValue(new Error('fail')),
      });
      const svc = new TokenBlacklistService(failRedis as any);
      await svc.add('my-token', 3600);

      const result = await svc.has('my-token');

      expect(result).toBe(true);
      // Should NOT reach Redis.get because local store returned true
      expect(failRedis.get).not.toHaveBeenCalled();
    });

    it('returns true from Redis and syncs to local store', async () => {
      const redis = makeRedis({
        get: jest.fn().mockResolvedValue('1'),
      });
      const service = new TokenBlacklistService(redis as any);

      const result = await service.has('my-token');

      expect(result).toBe(true);
      expect(redis.get).toHaveBeenCalledWith(redisKey('my-token'));
      // Should now be in local store
      expect(service.isBlacklisted('my-token')).toBe(true);
    });

    it('returns false when not in local or Redis', async () => {
      const redis = makeRedis({
        get: jest.fn().mockResolvedValue(null),
      });
      const service = new TokenBlacklistService(redis as any);

      const result = await service.has('unknown-token');

      expect(result).toBe(false);
    });

    it('returns false when Redis disabled and not in local', async () => {
      const redis = makeRedis({ isEnabled: jest.fn().mockReturnValue(false) });
      const service = new TokenBlacklistService(redis as any);

      const result = await service.has('unknown-token');

      expect(result).toBe(false);
      expect(redis.get).not.toHaveBeenCalled();
    });
  });

  // ------------------------------------------------------------------
  // isBlacklisted()
  // ------------------------------------------------------------------
  describe('isBlacklisted()', () => {
    it('checks local store only (sync)', () => {
      const redis = makeRedis();
      const service = new TokenBlacklistService(redis as any);

      // Not in local store
      expect(service.isBlacklisted('absent-token')).toBe(false);

      // Redis is NOT consulted — purely synchronous local check
      expect(redis.get).not.toHaveBeenCalled();
    });
  });
});
