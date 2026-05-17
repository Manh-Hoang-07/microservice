// ---------------------------------------------------------------------------
// Module mocks -- must come before any import
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
}));

jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
}), { virtual: true });

jest.mock('src/generated/prisma', () => ({
  PrismaClient: jest.fn(),
  Prisma: {},
}), { virtual: true });

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn(),
}));

jest.mock('@package/redis', () => ({
  RedisService: jest.fn(),
}));

jest.mock('../../../src/rbac/services/rbac-assigned-codes.codec', () => ({
  encodeAssignedCodes: (codes: string[]) => `codes:v1:${JSON.stringify(codes)}`,
  decodeAssignedCodes: (raw: string) => {
    if (!raw?.startsWith('codes:v1:')) return null;
    try { return JSON.parse(raw.slice('codes:v1:'.length)); } catch { return null; }
  },
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { RbacCacheService } from '../../../src/rbac/services/rbac-cache.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRedis() {
  return {
    isEnabled: jest.fn().mockReturnValue(true),
    get: jest.fn(),
    del: jest.fn(),
    multi: jest.fn(),
    hgetall: jest.fn(),
    hincrby: jest.fn(),
    publish: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    smembers: jest.fn(),
    deleteMany: jest.fn(),
  };
}

function makeMockConfig(overrides: Record<string, any> = {}) {
  return {
    get: jest.fn((key: string) => overrides[key] ?? undefined),
  };
}

function createService(opts: { redisEnabled?: boolean; configOverrides?: Record<string, any> } = {}) {
  const redis = makeMockRedis();
  if (opts.redisEnabled === false) redis.isEnabled.mockReturnValue(false);
  const config = makeMockConfig(opts.configOverrides ?? {});
  const service = new (RbacCacheService as any)(redis, config);
  return { service, redis, config };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('RbacCacheService', () => {
  // --- getPermissions ---
  describe('getPermissions', () => {
    it('should return cached:false when redis is disabled', async () => {
      const { service } = createService({ redisEnabled: false });
      const result = await service.getPermissions('u1');
      expect(result).toEqual({ codes: [], cached: false });
    });

    it('should return decoded permissions when cache hit', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '1' });
      redis.get.mockResolvedValue('codes:v1:["role.view","role.create"]');

      const result = await service.getPermissions('u1');
      expect(result).toEqual({ codes: ['role.view', 'role.create'], cached: true });
    });

    it('should return cached:false on cache miss', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '1' });
      redis.get.mockResolvedValue(null);

      const result = await service.getPermissions('u1');
      expect(result).toEqual({ codes: [], cached: false });
    });

    it('should evict legacy bitmap-prefixed entries', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '1' });
      redis.get.mockResolvedValue('b64:v1:some-legacy-data');

      const result = await service.getPermissions('u1');
      expect(result).toEqual({ codes: [], cached: false });
      expect(redis.del).toHaveBeenCalled();
    });

    it('should build a versioned per-user cache key', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '2' });
      redis.get.mockResolvedValue('codes:v1:["perm1"]');

      await service.getPermissions('u1');
      expect(redis.get).toHaveBeenCalledWith('rbac:v2:u:u1');
    });

    it('should default version to 1 when redis returns no version metadata', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '1' });
      redis.get.mockResolvedValue(null);

      await service.getPermissions('u1');
      expect(redis.get).toHaveBeenCalledWith('rbac:v1:u:u1');
    });
  });

  // --- setPermissions ---
  describe('setPermissions', () => {
    it('should not write when redis is disabled', async () => {
      const { service, redis } = createService({ redisEnabled: false });
      await service.setPermissions('u1', ['a']);
      expect(redis.multi).not.toHaveBeenCalled();
    });

    it('should write encoded codes and track key', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '3' });
      redis.multi.mockResolvedValue(undefined);

      await service.setPermissions('u1', ['a', 'b']);
      expect(redis.multi).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.arrayContaining(['SET', 'rbac:v3:u:u1']),
        ]),
      );
    });
  });

  // --- clearUserCache ---
  describe('clearUserCache', () => {
    it('should delete the specific cache key', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '1' });
      redis.del.mockResolvedValue(undefined);

      await service.clearUserCache('u1');
      expect(redis.del).toHaveBeenCalledWith('rbac:v1:u:u1');
    });

    it('should noop when redis disabled', async () => {
      const { service, redis } = createService({ redisEnabled: false });
      await service.clearUserCache('u1');
      expect(redis.del).not.toHaveBeenCalled();
    });
  });

  // --- clearAllUserCaches ---
  describe('clearAllUserCaches', () => {
    it('should rename tracked set, delete all keys, and publish', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '1' });
      redis.multi.mockResolvedValue(undefined);
      redis.smembers.mockResolvedValue(['rbac:v1:u:u1']);
      redis.deleteMany.mockResolvedValue(undefined);
      redis.del.mockResolvedValue(undefined);
      redis.publish.mockResolvedValue(undefined);

      await service.clearAllUserCaches('u1');

      expect(redis.multi).toHaveBeenCalled();
      expect(redis.smembers).toHaveBeenCalled();
      expect(redis.deleteMany).toHaveBeenCalledWith(['rbac:v1:u:u1']);
      expect(redis.publish).toHaveBeenCalled();
    });

    it('should publish even when rename fails (no tracked entries)', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '1' });
      redis.multi.mockRejectedValue(new Error('no key'));
      redis.publish.mockResolvedValue(undefined);

      await service.clearAllUserCaches('u1');
      expect(redis.publish).toHaveBeenCalledWith(
        'rbac:invalidation',
        expect.stringContaining('user_all'),
      );
    });

    it('should noop when redis disabled', async () => {
      const { service, redis } = createService({ redisEnabled: false });
      await service.clearAllUserCaches('u1');
      expect(redis.multi).not.toHaveBeenCalled();
    });
  });

  // --- bumpVersion ---
  describe('bumpVersion', () => {
    it('should increment version and publish', async () => {
      const { service, redis } = createService();
      redis.hincrby.mockResolvedValue(5);
      redis.publish.mockResolvedValue(undefined);

      await service.bumpVersion();

      expect(redis.hincrby).toHaveBeenCalledWith('rbac:meta', 'version', 1);
      expect(redis.publish).toHaveBeenCalledWith(
        'rbac:invalidation',
        expect.stringContaining('"type":"clear_all"'),
      );
    });

    it('should noop when redis disabled', async () => {
      const { service, redis } = createService({ redisEnabled: false });
      await service.bumpVersion();
      expect(redis.hincrby).not.toHaveBeenCalled();
    });
  });

  // --- onModuleInit ---
  describe('onModuleInit', () => {
    it('should subscribe to invalidation channel when redis enabled', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '1' });
      redis.subscribe.mockResolvedValue(undefined);

      await service.onModuleInit();

      expect(redis.subscribe).toHaveBeenCalledWith('rbac:invalidation', expect.any(Function));
    });

    it('should not subscribe when redis disabled', async () => {
      const { service, redis } = createService({ redisEnabled: false });
      await service.onModuleInit();
      expect(redis.subscribe).not.toHaveBeenCalled();
    });
  });

  // --- onModuleDestroy ---
  describe('onModuleDestroy', () => {
    it('should unsubscribe from the invalidation channel', async () => {
      const { service, redis } = createService();
      redis.hgetall.mockResolvedValue({ version: '1' });
      redis.subscribe.mockResolvedValue(undefined);
      redis.unsubscribe.mockResolvedValue(undefined);

      await service.onModuleInit();
      await service.onModuleDestroy();

      expect(redis.unsubscribe).toHaveBeenCalledWith('rbac:invalidation', expect.any(Function));
    });
  });
});
