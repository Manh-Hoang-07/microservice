// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('ioredis', () => {
  const mRedis = {
    on: jest.fn().mockReturnThis(),
    connect: jest.fn().mockResolvedValue(undefined),
    quit: jest.fn().mockResolvedValue('OK'),
    get: jest.fn().mockResolvedValue(null),
    setex: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
  };
  return { __esModule: true, default: jest.fn(() => mRedis), _instance: mRedis };
});

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { GatewayCacheService } from '../../src/cache/cache.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeConfig(overrides: Record<string, any> = {}) {
  const store: Record<string, any> = {
    'gateway.redisUrl': 'redis://localhost:6379',
    ...overrides,
  };
  return { get: jest.fn((key: string, fallback?: any) => store[key] ?? fallback) };
}

function getRedisInstance() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('ioredis')._instance;
}

function createService(configOverrides: Record<string, any> = {}) {
  const config = makeConfig(configOverrides);
  const service = new GatewayCacheService(config as any);
  return { service, config };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('GatewayCacheService', () => {
  let redis: ReturnType<typeof getRedisInstance>;

  beforeEach(() => {
    jest.clearAllMocks();
    redis = getRedisInstance();
  });

  // ------------------------------------------------------------------
  // onModuleInit
  // ------------------------------------------------------------------
  describe('onModuleInit()', () => {
    it('connects to Redis when URL is configured', async () => {
      const { service } = createService();
      await service.onModuleInit();

      expect(redis.connect).toHaveBeenCalled();
      expect(service.isEnabled).toBe(true);
    });

    it('disables caching when REDIS_URL is empty', async () => {
      const { service } = createService({ 'gateway.redisUrl': '' });
      await service.onModuleInit();

      expect(redis.connect).not.toHaveBeenCalled();
      expect(service.isEnabled).toBe(false);
    });

    it('disables caching when Redis connection fails', async () => {
      redis.connect.mockRejectedValueOnce(new Error('ECONNREFUSED'));
      const { service } = createService();
      await service.onModuleInit();

      expect(service.isEnabled).toBe(false);
    });
  });

  // ------------------------------------------------------------------
  // onModuleDestroy
  // ------------------------------------------------------------------
  describe('onModuleDestroy()', () => {
    it('quits Redis client', async () => {
      const { service } = createService();
      await service.onModuleInit();
      await service.onModuleDestroy();

      expect(redis.quit).toHaveBeenCalled();
    });

    it('does not throw when client is null', async () => {
      const { service } = createService({ 'gateway.redisUrl': '' });
      await service.onModuleInit();
      await expect(service.onModuleDestroy()).resolves.not.toThrow();
    });
  });

  // ------------------------------------------------------------------
  // get()
  // ------------------------------------------------------------------
  describe('get()', () => {
    it('returns parsed JSON from Redis', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValueOnce(JSON.stringify({ foo: 'bar' }));

      const result = await service.get('my-key');

      expect(redis.get).toHaveBeenCalledWith('gateway:my-key');
      expect(result).toEqual({ foo: 'bar' });
    });

    it('returns null when key is not found', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValueOnce(null);

      const result = await service.get('missing');
      expect(result).toBeNull();
    });

    it('returns null when client is disabled', async () => {
      const { service } = createService({ 'gateway.redisUrl': '' });
      await service.onModuleInit();

      const result = await service.get('any-key');
      expect(result).toBeNull();
    });

    it('returns null when Redis throws', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockRejectedValueOnce(new Error('timeout'));

      const result = await service.get('err-key');
      expect(result).toBeNull();
    });
  });

  // ------------------------------------------------------------------
  // set()
  // ------------------------------------------------------------------
  describe('set()', () => {
    it('stores serialised JSON with TTL', async () => {
      const { service } = createService();
      await service.onModuleInit();

      await service.set('k', { a: 1 }, 60);

      expect(redis.setex).toHaveBeenCalledWith('gateway:k', 60, JSON.stringify({ a: 1 }));
    });

    it('uses default TTL of 120 when omitted', async () => {
      const { service } = createService();
      await service.onModuleInit();

      await service.set('k', 'v');

      expect(redis.setex).toHaveBeenCalledWith('gateway:k', 120, JSON.stringify('v'));
    });

    it('does nothing when client is disabled', async () => {
      const { service } = createService({ 'gateway.redisUrl': '' });
      await service.onModuleInit();

      await service.set('k', 'v');
      expect(redis.setex).not.toHaveBeenCalled();
    });

    it('swallows Redis errors silently', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.setex.mockRejectedValueOnce(new Error('disk full'));

      await expect(service.set('k', 'v')).resolves.not.toThrow();
    });
  });

  // ------------------------------------------------------------------
  // del()
  // ------------------------------------------------------------------
  describe('del()', () => {
    it('deletes the prefixed key', async () => {
      const { service } = createService();
      await service.onModuleInit();

      await service.del('rm-key');

      expect(redis.del).toHaveBeenCalledWith('gateway:rm-key');
    });

    it('does nothing when client is disabled', async () => {
      const { service } = createService({ 'gateway.redisUrl': '' });
      await service.onModuleInit();

      await service.del('rm-key');
      expect(redis.del).not.toHaveBeenCalled();
    });

    it('swallows errors', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.del.mockRejectedValueOnce(new Error('boom'));

      await expect(service.del('k')).resolves.not.toThrow();
    });
  });

  // ------------------------------------------------------------------
  // getOrSet()
  // ------------------------------------------------------------------
  describe('getOrSet()', () => {
    it('returns cached value without calling factory (cache hit)', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValueOnce(JSON.stringify([1, 2, 3]));

      const factory = jest.fn();
      const result = await service.getOrSet('hit-key', factory, 60);

      expect(result).toEqual([1, 2, 3]);
      expect(factory).not.toHaveBeenCalled();
    });

    it('calls factory and caches result on miss', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValueOnce(null);

      const factory = jest.fn().mockResolvedValue({ data: 'fresh' });
      const result = await service.getOrSet('miss-key', factory, 30);

      expect(factory).toHaveBeenCalled();
      expect(result).toEqual({ data: 'fresh' });
      expect(redis.setex).toHaveBeenCalledWith(
        'gateway:miss-key',
        30,
        JSON.stringify({ data: 'fresh' }),
      );
    });

    it('accepts options object with ttlSeconds', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValueOnce(null);

      const factory = jest.fn().mockResolvedValue('val');
      await service.getOrSet('opt-key', factory, { ttlSeconds: 500 });

      expect(redis.setex).toHaveBeenCalledWith('gateway:opt-key', 500, JSON.stringify('val'));
    });

    it('skips caching when shouldCache returns false', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValueOnce(null);

      const factory = jest.fn().mockResolvedValue([]);
      const result = await service.getOrSet('empty-key', factory, {
        ttlSeconds: 60,
        shouldCache: (v: unknown) => Array.isArray(v) && (v as any[]).length > 0,
      });

      expect(result).toEqual([]);
      expect(redis.setex).not.toHaveBeenCalled();
    });

    it('caches when shouldCache returns true', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValueOnce(null);

      const factory = jest.fn().mockResolvedValue([1, 2]);
      await service.getOrSet('ok-key', factory, {
        ttlSeconds: 60,
        shouldCache: (v: unknown) => Array.isArray(v) && (v as any[]).length > 0,
      });

      expect(redis.setex).toHaveBeenCalled();
    });

    it('uses default TTL 120 when options omit ttlSeconds', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValueOnce(null);

      const factory = jest.fn().mockResolvedValue('x');
      await service.getOrSet('def-ttl', factory, {});

      expect(redis.setex).toHaveBeenCalledWith('gateway:def-ttl', 120, JSON.stringify('x'));
    });

    // ---- single-flight dedup ----
    it('deduplicates concurrent calls for the same key (single-flight)', async () => {
      const { service } = createService();
      await service.onModuleInit();
      // Always miss cache
      redis.get.mockResolvedValue(null);

      let resolveFactory!: (v: string) => void;
      const factoryPromise = new Promise<string>((r) => { resolveFactory = r; });
      const factory = jest.fn().mockReturnValue(factoryPromise);

      // Fire two concurrent getOrSet calls for the same key
      const p1 = service.getOrSet('dup-key', factory, 60);
      const p2 = service.getOrSet('dup-key', factory, 60);

      resolveFactory('shared-result');

      const [r1, r2] = await Promise.all([p1, p2]);

      expect(r1).toBe('shared-result');
      expect(r2).toBe('shared-result');
      // Factory was only invoked once despite two callers
      expect(factory).toHaveBeenCalledTimes(1);
    });

    it('cleans up inflight map after factory resolves', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValue(null);

      const factory = jest.fn().mockResolvedValue('done');
      await service.getOrSet('cleanup-key', factory, 60);

      // A second call should invoke the factory again (not reuse inflight)
      redis.get.mockResolvedValueOnce(null);
      await service.getOrSet('cleanup-key', factory, 60);
      expect(factory).toHaveBeenCalledTimes(2);
    });

    it('cleans up inflight map even when factory rejects', async () => {
      const { service } = createService();
      await service.onModuleInit();
      redis.get.mockResolvedValue(null);

      const factory = jest.fn().mockRejectedValue(new Error('upstream down'));
      await expect(service.getOrSet('fail-key', factory, 60)).rejects.toThrow('upstream down');

      // Inflight should be cleared so next call retries
      const factory2 = jest.fn().mockResolvedValue('recovered');
      redis.get.mockResolvedValueOnce(null);
      const result = await service.getOrSet('fail-key', factory2, 60);
      expect(result).toBe('recovered');
    });
  });
});
