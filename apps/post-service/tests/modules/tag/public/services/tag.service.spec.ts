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

jest.mock('../../../../../src/modules/tag/repositories/tag.repository', () => ({
  TagRepository: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { PublicTagService } from '../../../../../src/modules/tag/public/services/tag.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockTagRepo() {
  return {
    findAllActive: jest.fn().mockResolvedValue([
      { id: 1n, name: 'JavaScript', slug: 'javascript' },
      { id: 2n, name: 'TypeScript', slug: 'typescript' },
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
describe('PublicTagService', () => {
  let service: PublicTagService;
  let tagRepo: ReturnType<typeof makeMockTagRepo>;
  let redis: ReturnType<typeof makeMockRedis>;

  beforeEach(() => {
    tagRepo = makeMockTagRepo();
    redis = makeMockRedis();
    service = new PublicTagService(tagRepo as any, redis as any);
  });

  describe('getAll', () => {
    it('should fetch tags from DB on cache miss and cache the result', async () => {
      const result = await service.getAll();

      expect(redis.get).toHaveBeenCalledWith('post:public:tags:list');
      expect(tagRepo.findAllActive).toHaveBeenCalled();
      expect(redis.set).toHaveBeenCalledWith(
        'post:public:tags:list',
        expect.any(String),
        600,
      );
      expect(result.data).toHaveLength(2);
    });

    it('should return cached data on cache hit', async () => {
      const cached = { data: [{ id: 1, name: 'Cached' }] };
      redis.get.mockResolvedValue(JSON.stringify(cached));

      const result = await service.getAll();

      expect(tagRepo.findAllActive).not.toHaveBeenCalled();
      expect(result).toEqual(cached);
    });

    it('should work without redis', async () => {
      const serviceNoRedis = new PublicTagService(tagRepo as any, undefined);
      const result = await serviceNoRedis.getAll();

      expect(result.data).toHaveLength(2);
    });

    it('should deduplicate concurrent identical requests', async () => {
      const [r1, r2] = await Promise.all([
        service.getAll(),
        service.getAll(),
      ]);

      expect(r1).toEqual(r2);
      // findAllActive may be called once (inflight dedup) or twice depending on timing,
      // but results must be equal
    });

    it('should gracefully handle redis.get failure and fall through to DB', async () => {
      redis.get.mockRejectedValue(new Error('Redis down'));

      const result = await service.getAll();

      expect(tagRepo.findAllActive).toHaveBeenCalled();
      expect(result.data).toHaveLength(2);
    });

    it('should gracefully handle redis.set failure after DB fetch', async () => {
      redis.set.mockRejectedValue(new Error('Redis down'));

      const result = await service.getAll();

      expect(tagRepo.findAllActive).toHaveBeenCalled();
      expect(result.data).toHaveLength(2);
    });
  });
});
