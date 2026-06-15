import { CachedService } from '../src/cached.service';

/**
 * In-memory fake of the subset of RedisService that CachedService uses.
 * Tracks set() calls so tests can assert on the keys actually written.
 */
class FakeRedis {
  store = new Map<string, string>();
  setCalls: Array<{ key: string; value: string; ttl?: number }> = [];

  isEnabled() {
    return true;
  }
  async get(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  async set(key: string, value: string, ttl?: number) {
    this.store.set(key, value);
    this.setCalls.push({ key, value, ttl });
  }
  async incr(key: string) {
    const next = Number(this.store.get(key) ?? '0') + 1;
    this.store.set(key, String(next));
    return next;
  }
}

class TestService extends CachedService {
  protected readonly cacheEntity = 'widget';
  constructor(redis?: any) {
    super(redis);
  }
  list(filter: object, options: object, loader: () => Promise<any>) {
    return this.cachedList(filter, options, 300, loader);
  }
  detail(id: string | number | bigint, loader: () => Promise<any>) {
    return this.cachedDetail(id, 300, loader);
  }
}

class NamespacedService extends CachedService {
  protected readonly cacheEntity = 'widget';
  protected readonly cacheNamespace = 'cms:public';
  constructor(redis?: any) {
    super(redis);
  }
  list(filter: object, options: object, loader: () => Promise<any>) {
    return this.cachedList(filter, options, 300, loader);
  }
}

describe('CachedService (shared)', () => {
  it('uses the neutral default namespace when not overridden', async () => {
    const redis = new FakeRedis();
    const svc = new TestService(redis as any);

    await svc.list({}, { page: 1 }, async () => ({ data: [] }));

    expect(redis.setCalls[0].key.startsWith('cache:widget:list:v0:')).toBe(true);
  });

  it('honours an overridden cacheNamespace', async () => {
    const redis = new FakeRedis();
    const svc = new NamespacedService(redis as any);

    await svc.list({}, { page: 1 }, async () => ({ data: [] }));

    expect(redis.setCalls[0].key.startsWith('cms:public:widget:list:v0:')).toBe(true);
  });

  it('writes different cache keys for different query variants', async () => {
    const redis = new FakeRedis();
    const svc = new TestService(redis as any);

    await svc.list({ status: 'active' }, { page: 1, take: 10 }, async () => ({ data: [1] }));
    await svc.list({ status: 'active' }, { page: 2, take: 10 }, async () => ({ data: [2] }));
    await svc.list({ status: 'active', type: 'x' }, { page: 1, take: 10 }, async () => ({ data: [3] }));

    const writtenKeys = redis.setCalls.map((c) => c.key);
    // Three distinct queries -> three distinct keys.
    expect(new Set(writtenKeys).size).toBe(3);
    expect(writtenKeys.every((k) => k.startsWith('cache:widget:list:v0:'))).toBe(true);
  });

  it('serves the second identical query from cache (loader runs once)', async () => {
    const redis = new FakeRedis();
    const svc = new TestService(redis as any);
    const loader = jest.fn().mockResolvedValue({ data: ['cached'] });

    const a = await svc.list({}, { page: 1 }, loader);
    const b = await svc.list({}, { page: 1 }, loader);

    expect(loader).toHaveBeenCalledTimes(1);
    expect(a).toEqual(b);
  });

  it('builds version-aware detail keys', async () => {
    const redis = new FakeRedis();
    const svc = new TestService(redis as any);

    await svc.detail(42n, async () => ({ id: '42' }));

    expect(redis.setCalls[0].key).toBe('cache:widget:detail:v0:42');
  });

  it('de-duplicates concurrent in-flight loads of the same key', async () => {
    const redis = new FakeRedis();
    const svc = new TestService(redis as any);
    const loader = jest.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: ['x'] }), 10)),
    );

    const [a, b] = await Promise.all([
      svc.list({}, { page: 1 }, loader),
      svc.list({}, { page: 1 }, loader),
    ]);

    expect(loader).toHaveBeenCalledTimes(1);
    expect(a).toEqual(b);
  });

  it('invalidate() bumps the version so subsequent reads use new keys and miss old cache', async () => {
    const redis = new FakeRedis();
    const svc = new TestService(redis as any);

    const first = jest.fn().mockResolvedValue({ data: ['v0'] });
    await svc.list({}, { page: 1 }, first);
    expect(first).toHaveBeenCalledTimes(1);

    // Writer invalidates.
    await svc.invalidate();
    expect(redis.store.get('cache:widget:ver')).toBe('1');

    // Same query now resolves to a v1 key -> cache miss -> loader runs again.
    const second = jest.fn().mockResolvedValue({ data: ['v1'] });
    const result = await svc.list({}, { page: 1 }, second);
    expect(second).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: ['v1'] });

    const v1Keys = redis.setCalls.filter((c) => c.key.includes(':v1:'));
    expect(v1Keys.length).toBe(1);
  });

  it('serialises BigInt payloads without throwing or losing the cache write', async () => {
    const redis = new FakeRedis();
    const svc = new TestService(redis as any);

    const payload = { data: [{ id: 42n, projectId: 7n }], meta: { total: 1n } };
    const result = await svc.list({}, { page: 1 }, async () => payload);

    expect(result).toBe(payload);
    // The write must have happened (no silent failure) and round-trip cleanly.
    expect(redis.setCalls.length).toBe(1);
    expect(JSON.parse(redis.setCalls[0].value)).toEqual({
      data: [{ id: '42', projectId: '7' }],
      meta: { total: '1' },
    });
  });

  it('works as a passthrough when Redis is unavailable', async () => {
    const svc = new TestService(undefined);
    const loader = jest.fn().mockResolvedValue({ data: ['no-redis'] });

    const a = await svc.list({}, { page: 1 }, loader);
    const b = await svc.list({}, { page: 1 }, loader);

    // No cache -> loader runs each time, but never throws.
    expect(loader).toHaveBeenCalledTimes(2);
    expect(a).toEqual({ data: ['no-redis'] });
    expect(b).toEqual({ data: ['no-redis'] });
    await expect(svc.invalidate()).resolves.toBeUndefined();
  });

  it('treats Redis as disabled when isEnabled() returns false', async () => {
    const redis = new FakeRedis();
    redis.isEnabled = () => false;
    const svc = new TestService(redis as any);
    const loader = jest.fn().mockResolvedValue({ data: ['x'] });

    await svc.list({}, { page: 1 }, loader);
    await svc.list({}, { page: 1 }, loader);

    // No reads or writes hit Redis; loader runs every time.
    expect(redis.setCalls.length).toBe(0);
    expect(loader).toHaveBeenCalledTimes(2);
  });
});
