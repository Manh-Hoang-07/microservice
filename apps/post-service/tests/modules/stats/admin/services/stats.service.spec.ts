// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
}));

jest.mock('nestjs-i18n', () => ({
  I18nService: jest.fn(),
}));

jest.mock('src/generated/prisma', () => ({
  PrismaClient: class {},
  Prisma: {},
}), { virtual: true });

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn(),
}), { virtual: true });

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
}), { virtual: true });

jest.mock('../../../../../src/modules/stats/repositories/stats.repository', () => ({
  StatsRepository: jest.fn(),
}));

jest.mock('../../../../../src/modules/post/repositories/post.repository', () => ({
  PostRepository: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { StatsAdminService } from '../../../../../src/modules/stats/admin/services/stats.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockStatsRepo() {
  return {
    getOverview: jest.fn().mockResolvedValue({
      postCounts: { total: 10, published: 6, draft: 4 },
      totalViews: BigInt(1000),
      viewsToday: BigInt(50),
      viewsLast7Days: BigInt(300),
      viewsLast30Days: BigInt(800),
    }),
    getPostStats: jest.fn().mockResolvedValue({ viewCount: BigInt(500) }),
    getDailyStatsForPost: jest.fn().mockResolvedValue([
      { statDate: new Date('2025-06-01'), viewCount: BigInt(50) },
      { statDate: new Date('2025-06-02'), viewCount: BigInt(80) },
    ]),
  };
}

function makeMockPostRepo(postOverride?: any) {
  return {
    findById: jest.fn().mockResolvedValue(
      postOverride !== undefined
        ? postOverride
        : { id: BigInt(1), name: 'Test Post', slug: 'test-post' },
    ),
  };
}

function makeService(statsRepo?: any, postRepo?: any) {
  return new StatsAdminService(
    statsRepo ?? makeMockStatsRepo(),
    postRepo ?? makeMockPostRepo(),
    { translate: jest.fn() } as any,
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('StatsAdminService', () => {
  describe('getOverview', () => {
    it('returns posts and views structure', async () => {
      const service = makeService();
      const result = await service.getOverview();

      expect(result.posts).toEqual({ total: 10, published: 6, draft: 4 });
      expect(result.views.total).toBe(BigInt(1000));
      expect(result.views.today).toBe(BigInt(50));
      expect(result.views.last7Days).toBe(BigInt(300));
      expect(result.views.last30Days).toBe(BigInt(800));
    });
  });

  describe('getPostDailyStats', () => {
    it('throws BadRequestException when id is not numeric', async () => {
      const service = makeService();
      await expect(service.getPostDailyStats('not-a-number', {})).rejects.toThrow(BadRequestException);
    });

    it('throws NotFoundException when post does not exist', async () => {
      const service = makeService(undefined, makeMockPostRepo(null));
      await expect(service.getPostDailyStats('1', {})).rejects.toThrow(NotFoundException);
    });

    it('returns post info and daily array', async () => {
      const service = makeService();
      const result = await service.getPostDailyStats('1', {
        startDate: '2025-06-01',
        endDate: '2025-06-02',
      });

      expect(result.postId).toBe(BigInt(1));
      expect(result.name).toBe('Test Post');
      expect(result.slug).toBe('test-post');
      expect(result.totalViews).toBe(BigInt(500));
      expect(result.daily).toHaveLength(2);
      expect(result.daily[0]).toEqual({ date: '2025-06-01', viewCount: BigInt(50) });
      expect(result.daily[1]).toEqual({ date: '2025-06-02', viewCount: BigInt(80) });
    });

    it('defaults to ~30 day range when no dates provided', async () => {
      const statsRepo = makeMockStatsRepo();
      const service = makeService(statsRepo);
      await service.getPostDailyStats('1', {});

      const [, start, end] = statsRepo.getDailyStatsForPost.mock.calls[0];
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / 86400000);
      expect(diffDays).toBeLessThanOrEqual(30);
      expect(diffDays).toBeGreaterThan(0);
    });

    it('returns totalViews as BigInt(0) when post has no stats row', async () => {
      const statsRepo = makeMockStatsRepo();
      statsRepo.getPostStats.mockResolvedValue(null);
      const service = makeService(statsRepo);
      const result = await service.getPostDailyStats('1', {});
      expect(result.totalViews).toBe(BigInt(0));
    });
  });
});
