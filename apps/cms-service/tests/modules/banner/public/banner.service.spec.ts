// ---------------------------------------------------------------------------
// Virtual module mocks (no real Prisma / DB in unit tests)
// ---------------------------------------------------------------------------
jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });
jest.mock('src/types', () => ({ toPrimaryKey: (v: any) => BigInt(v) }), { virtual: true });
jest.mock('../../../../src/core/database/prisma.service', () => ({ PrismaService: class {} }));

import { PublicBannerService } from '../../../../src/modules/banner/public/services/banner.service';

class FakeRedis {
  store = new Map<string, string>();
  setCalls: string[] = [];
  isEnabled() {
    return true;
  }
  async get(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  async set(key: string, value: string) {
    this.store.set(key, value);
    this.setCalls.push(key);
  }
  async incr(key: string) {
    const next = Number(this.store.get(key) ?? '0') + 1;
    this.store.set(key, String(next));
    return next;
  }
}

describe('PublicBannerService (caching)', () => {
  let redis: FakeRedis;
  let repo: { findManyPublic: jest.Mock; count: jest.Mock };
  let service: PublicBannerService;

  beforeEach(() => {
    redis = new FakeRedis();
    repo = {
      findManyPublic: jest.fn().mockResolvedValue([{ id: 1n, title: 'b' }]),
      count: jest.fn().mockResolvedValue(1),
    };
    service = new PublicBannerService(repo as any, redis as any);
  });

  it('caches by query: same query hits cache (repo called once)', async () => {
    await service.getList({ page: '1', limit: '10' });
    await service.getList({ page: '1', limit: '10' });

    expect(repo.findManyPublic).toHaveBeenCalledTimes(1);
  });

  it('different pagination produces different cache keys (repo called per variant)', async () => {
    await service.getList({ page: '1', limit: '10' });
    await service.getList({ page: '2', limit: '10' });
    await service.getList({ page: '1', limit: '50' });

    expect(repo.findManyPublic).toHaveBeenCalledTimes(3);
    expect(new Set(redis.setCalls).size).toBe(3);
  });

  it('different filters (locationCode) produce different cache keys', async () => {
    await service.getList({ locationCode: 'home' });
    await service.getList({ locationCode: 'footer' });

    expect(repo.findManyPublic).toHaveBeenCalledTimes(2);
    expect(new Set(redis.setCalls).size).toBe(2);
  });

  it('"now" (activeAt) does not bust the cache between identical calls', async () => {
    await service.getList({ page: '1' });
    await service.getList({ page: '1' });
    expect(repo.findManyPublic).toHaveBeenCalledTimes(1);
  });

  it('does not throw when caching BigInt-containing results', async () => {
    repo.findManyPublic.mockResolvedValue([{ id: 99n }]);
    repo.count.mockResolvedValue(5);
    await expect(service.getList({ page: '1' })).resolves.toBeDefined();
    // Write actually happened (not silently swallowed).
    expect(redis.setCalls.length).toBe(1);
  });
});
