// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('ioredis', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('@package/circuit-breaker', () => ({ createCircuitBreaker: jest.fn() }));
jest.mock('undici', () => ({ Agent: jest.fn() }));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { createHash } from 'crypto';
import { GatewaySearchService } from '../../../src/search/services/search.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sha1Prefix(query: string): string {
  return createHash('sha1').update(query).digest('hex').slice(0, 16);
}

function makeComicClient(overrides: Partial<Record<string, jest.Mock>> = {}) {
  return {
    searchComics: overrides.searchComics ?? jest.fn().mockResolvedValue({ items: ['comic1'] }),
  };
}

function makePostClient(overrides: Partial<Record<string, jest.Mock>> = {}) {
  return {
    searchPosts: overrides.searchPosts ?? jest.fn().mockResolvedValue({ items: ['post1'] }),
  };
}

function makeCache(overrides: Partial<Record<string, jest.Mock>> = {}) {
  return {
    // Default: invoke factory, return its result (simulates cache miss)
    getOrSet: overrides.getOrSet ?? jest.fn(
      (_key: string, factory: () => Promise<any>, _opts: any) => factory(),
    ),
  };
}

function createService(opts: {
  comicClient?: ReturnType<typeof makeComicClient>;
  postClient?: ReturnType<typeof makePostClient>;
  cache?: ReturnType<typeof makeCache>;
} = {}) {
  const comicClient = opts.comicClient ?? makeComicClient();
  const postClient = opts.postClient ?? makePostClient();
  const cache = opts.cache ?? makeCache();
  const service = new GatewaySearchService(comicClient as any, postClient as any, cache as any);
  return { service, comicClient, postClient, cache };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('GatewaySearchService', () => {
  beforeEach(() => jest.clearAllMocks());

  // ------------------------------------------------------------------
  // search() — happy paths
  // ------------------------------------------------------------------
  describe('search() — happy paths', () => {
    it('returns comics and posts when both upstreams succeed', async () => {
      const { service } = createService();
      const result = await service.search('batman', 1, 10);

      expect(result).toEqual({
        comics: { items: ['comic1'] },
        posts: { items: ['post1'] },
        query: 'batman',
        page: 1,
        limit: 10,
      });
    });

    it('uses default page=1 and limit=10', async () => {
      const comicClient = makeComicClient();
      const postClient = makePostClient();
      const { service } = createService({ comicClient, postClient });

      await service.search('test');

      expect(comicClient.searchComics).toHaveBeenCalledWith('test', { page: 1, limit: 10 });
      expect(postClient.searchPosts).toHaveBeenCalledWith('test', { page: 1, limit: 10 });
    });

    it('strips the internal _ok flag from the result', async () => {
      const { service } = createService();
      const result = await service.search('x');

      expect(result).not.toHaveProperty('_ok');
    });

    it('passes custom page and limit to clients', async () => {
      const comicClient = makeComicClient();
      const postClient = makePostClient();
      const { service } = createService({ comicClient, postClient });

      await service.search('query', 3, 25);

      expect(comicClient.searchComics).toHaveBeenCalledWith('query', { page: 3, limit: 25 });
      expect(postClient.searchPosts).toHaveBeenCalledWith('query', { page: 3, limit: 25 });
    });
  });

  // ------------------------------------------------------------------
  // search() — cache key construction
  // ------------------------------------------------------------------
  describe('search() — cache key construction', () => {
    it('normalises query (trim + lowercase) and hashes for the cache key', async () => {
      const cache = makeCache();
      const { service } = createService({ cache });

      await service.search('  BaTmAn  ', 1, 10);

      const expectedHash = sha1Prefix('batman');
      const expectedKey = `search:all:${expectedHash}:1:10`;
      expect(cache.getOrSet).toHaveBeenCalledWith(
        expectedKey,
        expect.any(Function),
        expect.objectContaining({ ttlSeconds: 30 }),
      );
    });

    it('uses "empty" hash for empty/whitespace-only query', async () => {
      const cache = makeCache();
      const { service } = createService({ cache });

      await service.search('   ', 1, 5);

      expect(cache.getOrSet).toHaveBeenCalledWith(
        'search:all:empty:1:5',
        expect.any(Function),
        expect.anything(),
      );
    });

    it('uses "empty" hash for null/undefined query', async () => {
      const cache = makeCache();
      const { service } = createService({ cache });

      await service.search(null as any);

      expect(cache.getOrSet).toHaveBeenCalledWith(
        'search:all:empty:1:10',
        expect.any(Function),
        expect.anything(),
      );
    });

    it('includes page and limit in the cache key', async () => {
      const cache = makeCache();
      const { service } = createService({ cache });

      await service.search('q', 2, 20);

      const hash = sha1Prefix('q');
      expect(cache.getOrSet).toHaveBeenCalledWith(
        `search:all:${hash}:2:20`,
        expect.any(Function),
        expect.anything(),
      );
    });
  });

  // ------------------------------------------------------------------
  // search() — upstream failures
  // ------------------------------------------------------------------
  describe('search() — upstream failures', () => {
    it('returns empty comics when comicClient rejects', async () => {
      const comicClient = makeComicClient({
        searchComics: jest.fn().mockRejectedValue(new Error('comic down')),
      });
      const { service } = createService({ comicClient });

      const result = await service.search('x');

      expect(result).toMatchObject({ comics: [], posts: { items: ['post1'] } });
    });

    it('returns empty posts when postClient rejects', async () => {
      const postClient = makePostClient({
        searchPosts: jest.fn().mockRejectedValue(new Error('post down')),
      });
      const { service } = createService({ postClient });

      const result = await service.search('x');

      expect(result).toMatchObject({ comics: { items: ['comic1'] }, posts: [] });
    });

    it('returns empty for both when both upstreams fail', async () => {
      const comicClient = makeComicClient({
        searchComics: jest.fn().mockRejectedValue(new Error('fail')),
      });
      const postClient = makePostClient({
        searchPosts: jest.fn().mockRejectedValue(new Error('fail')),
      });
      const { service } = createService({ comicClient, postClient });

      const result = await service.search('x');

      expect(result).toMatchObject({ comics: [], posts: [] });
    });
  });

  // ------------------------------------------------------------------
  // search() — shouldCache predicate
  // ------------------------------------------------------------------
  describe('search() — shouldCache predicate', () => {
    it('allows caching when at least one upstream succeeds', async () => {
      const cache = makeCache();
      const { service } = createService({ cache });

      await service.search('ok');

      const opts = cache.getOrSet.mock.calls[0][2];
      // _ok is true when at least one succeeded
      expect(opts.shouldCache({ _ok: true })).toBe(true);
    });

    it('rejects caching when both upstreams fail (_ok = false)', async () => {
      const cache = makeCache();
      const comicClient = makeComicClient({
        searchComics: jest.fn().mockRejectedValue(new Error('fail')),
      });
      const postClient = makePostClient({
        searchPosts: jest.fn().mockRejectedValue(new Error('fail')),
      });
      const { service } = createService({ comicClient, postClient, cache });

      await service.search('fail');

      const opts = cache.getOrSet.mock.calls[0][2];
      expect(opts.shouldCache({ _ok: false })).toBe(false);
    });
  });

  // ------------------------------------------------------------------
  // search() — cache hit
  // ------------------------------------------------------------------
  describe('search() — cache hit', () => {
    it('returns cached value without calling upstreams', async () => {
      const cachedResult = { comics: [1], posts: [2], query: 'q', page: 1, limit: 10 };
      const cache = makeCache({
        getOrSet: jest.fn().mockResolvedValue(cachedResult),
      });
      const comicClient = makeComicClient();
      const { service } = createService({ comicClient, cache });

      const result = await service.search('q');

      expect(result).toEqual(cachedResult);
      expect(comicClient.searchComics).not.toHaveBeenCalled();
    });

    it('strips _ok from cached values that contain it', async () => {
      const cachedResult = { comics: [], posts: [], _ok: true, query: 'q', page: 1, limit: 10 };
      const cache = makeCache({
        getOrSet: jest.fn().mockResolvedValue(cachedResult),
      });
      const { service } = createService({ cache });

      const result = await service.search('q');

      expect(result).not.toHaveProperty('_ok');
    });
  });
});
