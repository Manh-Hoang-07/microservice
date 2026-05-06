// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { CachedService } from '../../../src/core/cache/cached.service';

// ---------------------------------------------------------------------------
// Concrete subclass for testing
// ---------------------------------------------------------------------------
class TestCachedService extends CachedService {
  async callGetOrSet<T>(key: string, ttl: number, factory: () => Promise<T>) {
    return this.getOrSet(key, ttl, factory);
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRedis(enabled = true) {
  return {
    isEnabled: jest.fn().mockReturnValue(enabled),
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('CachedService', () => {
  let service: TestCachedService;
  let redis: ReturnType<typeof makeMockRedis>;

  beforeEach(() => {
    redis = makeMockRedis();
    service = new TestCachedService(redis as any);
  });

  afterEach(() => jest.restoreAllMocks());

  it('should return cached value from Redis when available', async () => {
    const cached = { foo: 'bar' };
    redis.get.mockResolvedValue(JSON.stringify(cached));

    const result = await service.callGetOrSet('key1', 60, async () => ({ foo: 'miss' }));

    expect(result).toEqual(cached);
    expect(redis.get).toHaveBeenCalledWith('key1');
    expect(redis.set).not.toHaveBeenCalled();
  });

  it('should call factory and store in Redis on cache miss', async () => {
    redis.get.mockResolvedValue(null);
    const factory = jest.fn().mockResolvedValue({ data: 'fresh' });

    const result = await service.callGetOrSet('key2', 120, factory);

    expect(result).toEqual({ data: 'fresh' });
    expect(factory).toHaveBeenCalledTimes(1);
    expect(redis.set).toHaveBeenCalledWith(
      'key2',
      JSON.stringify({ data: 'fresh' }),
      120,
    );
  });

  it('should deduplicate concurrent calls for the same key (inflight)', async () => {
    redis.get.mockResolvedValue(null);
    let resolveFactory!: (v: any) => void;
    const factoryPromise = new Promise<any>((res) => { resolveFactory = res; });
    const factory = jest.fn().mockReturnValue(factoryPromise);

    const p1 = service.callGetOrSet('dup', 60, factory);
    // Flush microtasks so the first call enters the factory and registers inflight
    await new Promise((r) => setImmediate(r));

    const p2 = service.callGetOrSet('dup', 60, factory);

    // Factory should only be called once despite two concurrent requests
    expect(factory).toHaveBeenCalledTimes(1);

    resolveFactory({ val: 1 });
    const [r1, r2] = await Promise.all([p1, p2]);

    expect(r1).toEqual({ val: 1 });
    expect(r2).toEqual({ val: 1 });
  });

  it('should clean up inflight entry after promise resolves', async () => {
    redis.get.mockResolvedValue(null);
    const factory = jest.fn().mockResolvedValue('ok');

    await service.callGetOrSet('clean', 10, factory);

    // After resolution, calling again should invoke the factory again
    await service.callGetOrSet('clean', 10, factory);
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('should work when Redis is disabled', async () => {
    redis.isEnabled.mockReturnValue(false);
    const factory = jest.fn().mockResolvedValue({ data: 'no-redis' });

    const result = await service.callGetOrSet('key3', 60, factory);

    expect(result).toEqual({ data: 'no-redis' });
    expect(redis.get).not.toHaveBeenCalled();
    expect(redis.set).not.toHaveBeenCalled();
  });

  it('should work when Redis is not provided', async () => {
    const svc = new TestCachedService(undefined);
    const factory = jest.fn().mockResolvedValue('fallback');

    const result = await svc.callGetOrSet('no-redis', 60, factory);

    expect(result).toBe('fallback');
  });

  it('should handle Redis get error gracefully and call factory', async () => {
    redis.get.mockRejectedValue(new Error('Redis down'));
    const factory = jest.fn().mockResolvedValue({ data: 'fallback' });

    const result = await service.callGetOrSet('err', 60, factory);

    expect(result).toEqual({ data: 'fallback' });
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('should handle Redis set error gracefully and still return result', async () => {
    redis.get.mockResolvedValue(null);
    redis.set.mockRejectedValue(new Error('Redis write fail'));
    const factory = jest.fn().mockResolvedValue({ data: 'ok' });

    const result = await service.callGetOrSet('set-err', 60, factory);

    expect(result).toEqual({ data: 'ok' });
  });

  it('should convert BigInt to Number when serializing to Redis', async () => {
    redis.get.mockResolvedValue(null);
    const factory = jest.fn().mockResolvedValue({ id: BigInt(123) });

    await service.callGetOrSet('bigint', 60, factory);

    expect(redis.set).toHaveBeenCalledWith(
      'bigint',
      JSON.stringify({ id: 123 }),
      60,
    );
  });
});
