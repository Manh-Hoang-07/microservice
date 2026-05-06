// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
}));

jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
}), { virtual: true });

jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
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
    findAll: jest.fn().mockResolvedValue([]),
  };
}

function makeMockRedis() {
  return {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    isEnabled: jest.fn().mockReturnValue(true),
  };
}

function buildService() {
  const categoryRepo = makeMockCategoryRepo();
  const redis = makeMockRedis();

  const service = new PublicCategoryService(categoryRepo as any, redis as any);

  return { service, categoryRepo, redis };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('PublicCategoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll()', () => {
    it('returns categories from DB on cache miss', async () => {
      const { service, categoryRepo, redis } = buildService();
      const categories = [{ id: 1n, name: 'Action' }];
      categoryRepo.findAll.mockResolvedValue(categories);

      const result = await service.getAll();

      expect(result).toEqual({ data: categories });
      expect(categoryRepo.findAll).toHaveBeenCalled();
      expect(redis.set).toHaveBeenCalled();
    });

    it('returns cached result on cache hit', async () => {
      const { service, categoryRepo, redis } = buildService();
      const cached = { data: [{ id: 1, name: 'Cached' }] };
      redis.get.mockResolvedValue(JSON.stringify(cached));

      const result = await service.getAll();

      expect(result).toEqual(cached);
      expect(categoryRepo.findAll).not.toHaveBeenCalled();
    });

    it('falls through to DB when redis is disabled', async () => {
      const { service, categoryRepo, redis } = buildService();
      redis.isEnabled.mockReturnValue(false);
      categoryRepo.findAll.mockResolvedValue([]);

      const result = await service.getAll();

      expect(result).toEqual({ data: [] });
      expect(categoryRepo.findAll).toHaveBeenCalled();
    });
  });
});
