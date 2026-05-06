// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('ioredis', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('@package/circuit-breaker', () => ({ createCircuitBreaker: jest.fn() }));
jest.mock('undici', () => ({ Agent: jest.fn() }));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { GatewayHomepageService } from '../../../src/homepage/services/homepage.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeComicClient(overrides: Partial<Record<string, jest.Mock>> = {}) {
  return {
    getTopViewed: overrides.getTopViewed ?? jest.fn().mockResolvedValue([{ id: '1', title: 'Top' }]),
    getPopular: overrides.getPopular ?? jest.fn().mockResolvedValue([{ id: '2', title: 'Popular' }]),
    getNewest: overrides.getNewest ?? jest.fn().mockResolvedValue([{ id: '3', title: 'Newest' }]),
    getRecentlyUpdated: overrides.getRecentlyUpdated ?? jest.fn().mockResolvedValue([{ id: '4', title: 'Recent' }]),
    getCategories: overrides.getCategories ?? jest.fn().mockResolvedValue([{ id: 'c1', name: 'Action' }]),
  };
}

function makePostClient(overrides: Partial<Record<string, jest.Mock>> = {}) {
  return {
    getLatestPosts: overrides.getLatestPosts ?? jest.fn().mockResolvedValue([{ id: 'p1', title: 'Post' }]),
  };
}

function makeCache(overrides: Partial<Record<string, jest.Mock>> = {}) {
  return {
    // By default getOrSet just invokes the factory
    getOrSet: overrides.getOrSet ?? jest.fn((_key: string, factory: () => Promise<any>) => factory()),
    del: overrides.del ?? jest.fn().mockResolvedValue(undefined),
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
  const service = new GatewayHomepageService(comicClient as any, postClient as any, cache as any);
  return { service, comicClient, postClient, cache };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('GatewayHomepageService', () => {
  beforeEach(() => jest.clearAllMocks());

  // ------------------------------------------------------------------
  // getHomepageData()
  // ------------------------------------------------------------------
  describe('getHomepageData()', () => {
    it('returns all homepage sections aggregated', async () => {
      const { service } = createService();
      const result = await service.getHomepageData();

      expect(result).toEqual({
        top_viewed_comics: [{ id: '1', title: 'Top' }],
        trending_comics: [{ id: '1', title: 'Top' }],
        popular_comics: [{ id: '2', title: 'Popular' }],
        newest_comics: [{ id: '3', title: 'Newest' }],
        recent_update_comics: [{ id: '4', title: 'Recent' }],
        comic_categories: [{ id: 'c1', name: 'Action' }],
        latest_posts: [{ id: 'p1', title: 'Post' }],
      });
    });

    it('trending_comics mirrors top_viewed_comics', async () => {
      const { service } = createService();
      const result = await service.getHomepageData();

      expect(result.trending_comics).toBe(result.top_viewed_comics);
    });

    it('calls cache.getOrSet 6 times with correct keys', async () => {
      const cache = makeCache();
      const { service } = createService({ cache });
      await service.getHomepageData();

      expect(cache.getOrSet).toHaveBeenCalledTimes(6);

      const keys = cache.getOrSet.mock.calls.map((c: any[]) => c[0]);
      expect(keys).toEqual([
        'homepage:comics:top_viewed',
        'homepage:comics:popular',
        'homepage:comics:newest',
        'homepage:comics:recent_updated',
        'homepage:categories',
        'homepage:posts:latest',
      ]);
    });

    it('passes correct TTL values to cache', async () => {
      const cache = makeCache();
      const { service } = createService({ cache });
      await service.getHomepageData();

      const ttls = cache.getOrSet.mock.calls.map((c: any[]) => c[2]?.ttlSeconds);
      expect(ttls).toEqual([420, 1200, 120, 120, 43200, 300]);
    });

    it('passes shouldCache predicates that reject empty arrays', async () => {
      const cache = makeCache();
      const { service } = createService({ cache });
      await service.getHomepageData();

      // Each call passes a shouldCache that rejects empty arrays
      for (const call of cache.getOrSet.mock.calls) {
        const opts = call[2];
        expect(opts.shouldCache([])).toBe(false);
        expect(opts.shouldCache([1])).toBe(true);
        expect(opts.shouldCache(null)).toBe(false);
      }
    });

    it('calls comicClient methods with correct limits', async () => {
      const comicClient = makeComicClient();
      const { service } = createService({ comicClient });
      await service.getHomepageData();

      expect(comicClient.getTopViewed).toHaveBeenCalledWith(8);
      expect(comicClient.getPopular).toHaveBeenCalledWith(8);
      expect(comicClient.getNewest).toHaveBeenCalledWith(8);
      expect(comicClient.getRecentlyUpdated).toHaveBeenCalledWith(8);
      expect(comicClient.getCategories).toHaveBeenCalled();
    });

    it('calls postClient.getLatestPosts with limit 6', async () => {
      const postClient = makePostClient();
      const { service } = createService({ postClient });
      await service.getHomepageData();

      expect(postClient.getLatestPosts).toHaveBeenCalledWith(6);
    });

    it('returns cached value when cache hits (factory not called)', async () => {
      const cachedData = [{ id: 'cached' }];
      const cache = makeCache({
        getOrSet: jest.fn().mockResolvedValue(cachedData),
      });
      const comicClient = makeComicClient();
      const { service } = createService({ comicClient, cache });

      const result = await service.getHomepageData();

      // All sections get the same cached data
      expect(result.top_viewed_comics).toEqual(cachedData);
      // Upstream clients should NOT have been called (cache was used directly)
      expect(comicClient.getTopViewed).not.toHaveBeenCalled();
    });
  });

  // ------------------------------------------------------------------
  // clearCache()
  // ------------------------------------------------------------------
  describe('clearCache()', () => {
    it('deletes all 6 homepage cache keys', async () => {
      const cache = makeCache();
      const { service } = createService({ cache });

      await service.clearCache();

      expect(cache.del).toHaveBeenCalledTimes(6);
      const deletedKeys = cache.del.mock.calls.map((c: any[]) => c[0]);
      expect(deletedKeys).toEqual([
        'homepage:comics:top_viewed',
        'homepage:comics:popular',
        'homepage:comics:newest',
        'homepage:comics:recent_updated',
        'homepage:categories',
        'homepage:posts:latest',
      ]);
    });

    it('rejects when individual deletes reject (mock bypasses real del error-swallowing)', async () => {
      const cache = makeCache({
        del: jest.fn().mockRejectedValue(new Error('Redis down')),
      });
      const { service } = createService({ cache });

      await expect(service.clearCache()).rejects.toThrow('Redis down');
    });
  });
});
