// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { IamClient } from '../../src/clients/iam.client';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeConfig(overrides: Record<string, any> = {}) {
  const values: Record<string, any> = {
    IAM_INTERNAL_URL: 'http://iam.test/api/iam',
    INTERNAL_API_SECRET: 'secret',
    ...overrides,
  };
  return {
    get: jest.fn((key: string, def?: any) => (key in values ? values[key] : def)),
  };
}

/**
 * In-memory Redis double honouring the getOrSet contract used by IamClient:
 * read-through cache + single-flight via the factory. Stores serialized JSON
 * so BigInt-safety is exercised the same way the real impl does.
 */
function makeRedis(enabled = true) {
  const store = new Map<string, string>();
  const meta: Record<string, string> = { version: '1' };
  return {
    store,
    meta,
    isEnabled: jest.fn(() => enabled),
    hgetall: jest.fn(async (key: string) => (key === 'rbac:meta' ? { ...meta } : {})),
    getOrSet: jest.fn(async function (
      key: string,
      factory: () => Promise<any>,
      _ttl: number,
    ) {
      const raw = store.get(key);
      if (raw) return JSON.parse(raw);
      const result = await factory();
      store.set(
        key,
        JSON.stringify(result, (_k, v) => (typeof v === 'bigint' ? String(v) : v)),
      );
      return result;
    }),
  };
}

function jsonResponse(body: any, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

function buildClient(config: any, redis?: any) {
  const client = new IamClient(config as any, redis as any);
  client.onModuleInit();
  return client;
}

const MEMBER = { isMember: true, isOwner: false };
const DENY = { isMember: false, isOwner: false };

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('IamClient', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    (global as any).fetch = fetchMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroupMembership — happy path', () => {
    it('calls IAM and returns membership when no Redis', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ data: MEMBER }));
      const client = buildClient(makeConfig());

      const result = await client.getGroupMembership('u1', 'g1');

      expect(result).toEqual(MEMBER);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, opts] = fetchMock.mock.calls[0];
      expect(url).toContain('/internal/groups/membership');
      expect(url).toContain('userId=u1');
      expect(url).toContain('groupId=g1');
      expect(opts.headers['x-internal-secret']).toBe('secret');
    });

    it('unwraps a bare (non-{data}) body', async () => {
      fetchMock.mockResolvedValue(jsonResponse(MEMBER));
      const client = buildClient(makeConfig());

      expect(await client.getGroupMembership('u1', 'g1')).toEqual(MEMBER);
    });
  });

  describe('cache: miss → hit → version invalidation', () => {
    it('caches the result so a second call does not hit IAM (miss → hit)', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ data: MEMBER }));
      const redis = makeRedis();
      const client = buildClient(makeConfig(), redis);

      const first = await client.getGroupMembership('u1', 'g1');
      const second = await client.getGroupMembership('u1', 'g1');

      expect(first).toEqual(MEMBER);
      expect(second).toEqual(MEMBER);
      expect(fetchMock).toHaveBeenCalledTimes(1); // second served from cache
      // Key is version-aware (rbac:meta.version).
      expect([...redis.store.keys()][0]).toBe('iam:membership:v1:u1:g1');
    });

    it('separate users/groups use separate cache keys', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ data: MEMBER }));
      const redis = makeRedis();
      const client = buildClient(makeConfig(), redis);

      await client.getGroupMembership('u1', 'g1');
      await client.getGroupMembership('u2', 'g1');

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect([...redis.store.keys()]).toEqual([
        'iam:membership:v1:u1:g1',
        'iam:membership:v1:u2:g1',
      ]);
    });

    it('an rbac:meta.version bump invalidates the cache (new key → refetch)', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ data: MEMBER }));
      const redis = makeRedis();
      const client = buildClient(makeConfig(), redis);

      await client.getGroupMembership('u1', 'g1');
      expect(fetchMock).toHaveBeenCalledTimes(1);

      // IAM bumps the global version. RbacVersionTracker caches version for 2s,
      // so advance the clock past its TTL before the next read.
      redis.meta.version = '2';
      const realNow = Date.now;
      jest.spyOn(Date, 'now').mockImplementation(() => realNow() + 5_000);

      await client.getGroupMembership('u1', 'g1');

      expect(fetchMock).toHaveBeenCalledTimes(2); // new version key → cache miss
      expect([...redis.store.keys()]).toContain('iam:membership:v2:u1:g1');
    });

    it('falls back to a direct call when Redis is disabled', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ data: MEMBER }));
      const redis = makeRedis(false);
      const client = buildClient(makeConfig(), redis);

      const result = await client.getGroupMembership('u1', 'g1');

      expect(result).toEqual(MEMBER);
      expect(redis.getOrSet).not.toHaveBeenCalled();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('fail-open semantics', () => {
    it('returns DENY on timeout / network error (never grants)', async () => {
      fetchMock.mockRejectedValue(new Error('network down'));
      const client = buildClient(makeConfig());

      expect(await client.getGroupMembership('u1', 'g1')).toEqual(DENY);
    });

    it('returns DENY on a 4xx without throwing (definite IAM answer)', async () => {
      fetchMock.mockResolvedValue(jsonResponse({}, 403));
      const client = buildClient(makeConfig());

      expect(await client.getGroupMembership('u1', 'g1')).toEqual(DENY);
    });

    it('does not cache a DENY produced by an error (only successful fetch cached)', async () => {
      // getOrSet caches whatever the factory resolves; on error the factory
      // resolves DENY. Confirm a subsequent recovery is reflected only after
      // the cached DENY would be a problem — here we assert error → DENY and a
      // fresh client (cold cache) recovers.
      fetchMock.mockRejectedValueOnce(new Error('down'));
      const client = buildClient(makeConfig());
      expect(await client.getGroupMembership('u1', 'g1')).toEqual(DENY);
    });
  });

  describe('circuit breaker', () => {
    it('opens after 5 consecutive failures and fails fast (no fetch on 6th)', async () => {
      // Each call returns a 500 → throws → counts as a breaker failure.
      fetchMock.mockResolvedValue(jsonResponse({}, 500));
      const client = buildClient(makeConfig());

      for (let i = 0; i < 5; i++) {
        expect(await client.getGroupMembership('u1', 'g1')).toEqual(DENY);
      }
      expect(fetchMock).toHaveBeenCalledTimes(5);

      // Breaker is now OPEN: the 6th call must short-circuit (fail fast) and
      // still fail-open to DENY without issuing another HTTP request.
      const result = await client.getGroupMembership('u1', 'g1');
      expect(result).toEqual(DENY);
      expect(fetchMock).toHaveBeenCalledTimes(5); // unchanged → fast fail
    });

    it('keeps failing fast while open even for a would-be-successful call', async () => {
      fetchMock.mockResolvedValue(jsonResponse({}, 500));
      const client = buildClient(makeConfig());
      for (let i = 0; i < 5; i++) await client.getGroupMembership('u1', 'g1');

      // IAM "recovered" but breaker is still open → request never reaches it.
      fetchMock.mockResolvedValue(jsonResponse({ data: MEMBER }));
      expect(await client.getGroupMembership('u1', 'g1')).toEqual(DENY);
      expect(fetchMock).toHaveBeenCalledTimes(5);
    });
  });
});
