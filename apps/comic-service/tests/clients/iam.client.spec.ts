// ---------------------------------------------------------------------------
// IamClient — membership cache + circuit breaker.
//
// Verifies:
//   - cache miss → HTTP → hit (second call served from Redis, no 2nd fetch)
//   - cache key is version-aware (rbac:meta.version bump → new key → re-fetch)
//   - circuit breaker fail-fast after N consecutive failures (no fetch)
//   - fail-open: every failure path returns DENY ({isMember:false,isOwner:false})
//   - works without Redis (degrades to direct breaker-protected call)
// ---------------------------------------------------------------------------
import { IamClient } from '../../src/clients/iam.client';

// In-memory Redis double that mimics the slice of RedisService IamClient uses:
// isEnabled(), hgetall() (for RbacVersionTracker) and getOrSet() (membership).
function makeRedis(opts: { enabled?: boolean; version?: number } = {}) {
  const store = new Map<string, { value: any; expiresAt: number }>();
  let version = opts.version ?? 1;

  const redis = {
    enabled: opts.enabled ?? true,
    isEnabled() {
      return this.enabled;
    },
    setVersion(v: number) {
      version = v;
    },
    async hgetall(key: string): Promise<Record<string, string>> {
      if (key === 'rbac:meta') return { version: String(version) };
      return {};
    },
    async getOrSet<T>(key: string, factory: () => Promise<T>, _ttl: number): Promise<T> {
      const hit = store.get(key);
      if (hit && hit.expiresAt > Date.now()) return hit.value as T;
      // On factory rejection, nothing is cached (matches real getOrSet).
      const value = await factory();
      store.set(key, { value, expiresAt: Date.now() + 60_000 });
      return value;
    },
    _store: store,
  };
  return redis;
}

function makeConfig(overrides: Record<string, string> = {}) {
  const values: Record<string, string> = {
    IAM_INTERNAL_URL: 'http://iam.test/api/iam',
    INTERNAL_API_SECRET: 'secret',
    ...overrides,
  };
  return {
    get: (key: string, def?: string) => values[key] ?? def,
  };
}

function okResponse(body: any) {
  return {
    ok: true,
    status: 200,
    json: async () => body,
  };
}

function buildClient(redis: any, config = makeConfig()) {
  const client = new IamClient(config as any, redis as any);
  client.onModuleInit(); // wire up the breaker
  return client;
}

describe('IamClient', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    (global as any).fetch = fetchMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroupMembership() cache', () => {
    it('fetches on miss then serves subsequent calls from cache (no 2nd fetch)', async () => {
      const redis = makeRedis();
      const client = buildClient(redis);
      fetchMock.mockResolvedValue(okResponse({ data: { isMember: true, isOwner: true } }));

      const first = await client.getGroupMembership('u1', 'g1');
      const second = await client.getGroupMembership('u1', 'g1');

      expect(first).toEqual({ isMember: true, isOwner: true });
      expect(second).toEqual({ isMember: true, isOwner: true });
      expect(fetchMock).toHaveBeenCalledTimes(1); // cache hit on 2nd call
    });

    it('uses a version-aware cache key — bumping rbac:meta.version re-fetches', async () => {
      const redis = makeRedis({ version: 1 });
      const client = buildClient(redis);
      fetchMock.mockResolvedValue(okResponse({ data: { isMember: true, isOwner: false } }));

      await client.getGroupMembership('u1', 'g1');
      expect(fetchMock).toHaveBeenCalledTimes(1);

      // IAM bumps the global version → previous key is logically invalidated.
      redis.setVersion(2);
      // Allow versionTracker's internal TTL window to pass would require timers;
      // instead construct a fresh client so the tracker re-reads the version.
      const client2 = buildClient(redis);
      await client2.getGroupMembership('u1', 'g1');

      expect(fetchMock).toHaveBeenCalledTimes(2);
      const keys = Array.from((redis._store as Map<string, unknown>).keys());
      expect(keys).toEqual(
        expect.arrayContaining([
          'iam:membership:v1:u1:g1',
          'iam:membership:v2:u1:g1',
        ]),
      );
    });

    it('does not cache a DENY produced by a failed fetch', async () => {
      const redis = makeRedis();
      const client = buildClient(redis);
      fetchMock.mockRejectedValue(new Error('network'));

      const res = await client.getGroupMembership('u1', 'g1');

      expect(res).toEqual({ isMember: false, isOwner: false });
      expect((redis._store as Map<string, unknown>).size).toBe(0);
    });
  });

  describe('fail-open semantics', () => {
    it('returns DENY when IAM returns 5xx', async () => {
      const redis = makeRedis();
      const client = buildClient(redis);
      fetchMock.mockResolvedValue({ ok: false, status: 503, json: async () => ({}) });

      const res = await client.getGroupMembership('u1', 'g1');
      expect(res).toEqual({ isMember: false, isOwner: false });
    });

    it('maps a 4xx (definitive non-member) to DENY without throwing', async () => {
      const redis = makeRedis();
      const client = buildClient(redis);
      fetchMock.mockResolvedValue({ ok: false, status: 404, json: async () => ({}) });

      const res = await client.getGroupMembership('u1', 'g1');
      expect(res).toEqual({ isMember: false, isOwner: false });
    });

    it('works without Redis — degrades to a direct breaker-protected call', async () => {
      const redis = makeRedis({ enabled: false });
      const client = buildClient(redis);
      fetchMock.mockResolvedValue(okResponse({ data: { isMember: true, isOwner: false } }));

      const res = await client.getGroupMembership('u1', 'g1');
      expect(res).toEqual({ isMember: true, isOwner: false });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('circuit breaker', () => {
    it('opens after 5 consecutive failures and fail-fasts without calling IAM', async () => {
      // Redis disabled so every call reaches the breaker (no cache short-circuit)
      // and uses a distinct group id so no logical caching interferes.
      const redis = makeRedis({ enabled: false });
      const client = buildClient(redis);
      fetchMock.mockResolvedValue({ ok: false, status: 500, json: async () => ({}) });

      // 5 failures to trip the ConsecutiveBreaker(5).
      for (let i = 0; i < 5; i++) {
        const res = await client.getGroupMembership('u1', `g${i}`);
        expect(res).toEqual({ isMember: false, isOwner: false });
      }
      expect(fetchMock).toHaveBeenCalledTimes(5);

      // Breaker now OPEN — this call must fail-fast (DENY) WITHOUT a 6th fetch.
      const denied = await client.getGroupMembership('u1', 'g-open');
      expect(denied).toEqual({ isMember: false, isOwner: false });
      expect(fetchMock).toHaveBeenCalledTimes(5); // no new call while open
    });
  });
});
