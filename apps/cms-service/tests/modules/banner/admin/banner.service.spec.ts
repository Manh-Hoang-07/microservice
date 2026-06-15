// ---------------------------------------------------------------------------
// Virtual module mocks (no real Prisma / DB in unit tests)
// ---------------------------------------------------------------------------
jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });
jest.mock('src/types', () => ({ toPrimaryKey: (v: any) => BigInt(v) }), { virtual: true });
jest.mock('../../../../src/core/database/prisma.service', () => ({ PrismaService: class {} }));

import { AdminBannerService } from '../../../../src/modules/banner/admin/services/banner.service';
import { PublicBannerService } from '../../../../src/modules/banner/public/services/banner.service';
import { CacheVersionService } from '@package/redis';

class FakeRedis {
  store = new Map<string, string>();
  isEnabled() {
    return true;
  }
  async get(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  async set(key: string, value: string) {
    this.store.set(key, value);
  }
  async incr(key: string) {
    const next = Number(this.store.get(key) ?? '0') + 1;
    this.store.set(key, String(next));
    return next;
  }
}

describe('AdminBannerService cache invalidation (versioning)', () => {
  let redis: FakeRedis;
  let bannerRepo: any;
  let locationRepo: any;
  let cacheVersion: CacheVersionService;
  let admin: AdminBannerService;
  let publicSvc: PublicBannerService;

  beforeEach(() => {
    redis = new FakeRedis();
    bannerRepo = {
      findManyPublic: jest.fn().mockResolvedValue([{ id: 1n }]),
      count: jest.fn().mockResolvedValue(1),
      findById: jest.fn().mockResolvedValue({ id: 1n, title: 't' }),
      create: jest.fn().mockResolvedValue({ id: 2n }),
      update: jest.fn().mockResolvedValue({ id: 1n }),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    locationRepo = { findById: jest.fn().mockResolvedValue({ id: 5n }) };
    cacheVersion = new CacheVersionService(redis as any);
    admin = new AdminBannerService(bannerRepo, locationRepo, cacheVersion);
    publicSvc = new PublicBannerService(bannerRepo, redis as any);
  });

  it('create() bumps version so public cache is invalidated', async () => {
    // Warm the public cache.
    await publicSvc.getList({ page: '1' });
    expect(bannerRepo.findManyPublic).toHaveBeenCalledTimes(1);

    // Identical query served from cache.
    await publicSvc.getList({ page: '1' });
    expect(bannerRepo.findManyPublic).toHaveBeenCalledTimes(1);

    // Admin write invalidates by bumping the version counter.
    await admin.create({ locationId: 5n } as any);
    expect(redis.store.get('cms:public:banners:ver')).toBe('1');

    // Same public query now misses (new version in key) and re-loads.
    await publicSvc.getList({ page: '1' });
    expect(bannerRepo.findManyPublic).toHaveBeenCalledTimes(2);
  });

  it('update() and delete() also bump the version', async () => {
    await admin.update(1n as any, {} as any);
    expect(redis.store.get('cms:public:banners:ver')).toBe('1');

    await admin.delete(1n as any);
    expect(redis.store.get('cms:public:banners:ver')).toBe('2');
  });
});
