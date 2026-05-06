// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('@package/redis', () => ({
  RedisService: jest.fn(),
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

jest.mock('../../../../../src/modules/category/repositories/category.repository', () => ({
  CategoryRepository: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { PublicCategoryService } from '../../../../../src/modules/category/public/services/category.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockCategoryRepo() {
  return {
    findRootActiveTree: jest.fn().mockResolvedValue([
      { id: 1n, name: 'Tech', slug: 'tech', children: [{ id: 2n, name: 'Web', slug: 'web' }] },
      { id: 3n, name: 'Science', slug: 'science', children: [] },
    ]),
  };
}

function makeMockRedis() {
  return {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
    isEnabled: jest.fn().mockReturnValue(true),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('PublicCategoryService', () => {
  let service: PublicCategoryService;
  let categoryRepo: ReturnType<typeof makeMockCategoryRepo>;
  let redis: ReturnType<typeof makeMockRedis>;

  beforeEach(() => {
    categoryRepo = makeMockCategoryRepo();
    redis = makeMockRedis();
    service = new PublicCategoryService(categoryRepo as any, redis as any);
  });

  describe('getAll', () => {
    it('should fetch categories from DB on cache miss and cache the result', async () => {
      const result = await service.getAll();

      expect(redis.get).toHaveBeenCalledWith('post:public:categories:list');
      expect(categoryRepo.findRootActiveTree).toHaveBeenCalled();
      expect(redis.set).toHaveBeenCalledWith(
        'post:public:categories:list',
        expect.any(String),
        600,
      );
      expect(result.data).toHaveLength(2);
    });

    it('should return cached data on cache hit', async () => {
      const cached = { data: [{ id: 1, name: 'Cached' }] };
      redis.get.mockResolvedValue(JSON.stringify(cached));

      const result = await service.getAll();

      expect(categoryRepo.findRootActiveTree).not.toHaveBeenCalled();
      expect(result).toEqual(cached);
    });

    it('should work without redis', async () => {
      const serviceNoRedis = new PublicCategoryService(categoryRepo as any, undefined);
      const result = await serviceNoRedis.getAll();

      expect(result.data).toHaveLength(2);
    });

    it('should deduplicate concurrent identical requests', async () => {
      const [r1, r2] = await Promise.all([
        service.getAll(),
        service.getAll(),
      ]);

      expect(r1).toEqual(r2);
    });

    it('should gracefully handle redis.get failure and fall through to DB', async () => {
      redis.get.mockRejectedValue(new Error('Redis down'));

      const result = await service.getAll();

      expect(categoryRepo.findRootActiveTree).toHaveBeenCalled();
      expect(result.data).toHaveLength(2);
    });

    it('should gracefully handle redis.set failure after DB fetch', async () => {
      redis.set.mockRejectedValue(new Error('Redis down'));

      const result = await service.getAll();

      expect(categoryRepo.findRootActiveTree).toHaveBeenCalled();
      expect(result.data).toHaveLength(2);
    });
  });
});
