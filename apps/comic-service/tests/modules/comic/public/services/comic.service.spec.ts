// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
  createPaginationMeta: jest.fn((_opts: any, total: number) => ({ total })),
  parseQueryOptions: jest.fn((q: any, overrides?: any) => ({
    skip: 0,
    take: overrides?.defaultTake ?? q?.take ?? 20,
  })),
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
jest.mock('../../../../../src/modules/comic/repositories/comic.repository', () => ({
  ComicRepository: jest.fn(),
}));

jest.mock('../../../../../src/modules/comic/enums/comic-status.enum', () => ({
  ComicStatus: { published: 'published' },
  PUBLIC_COMIC_STATUSES: ['published'],
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { NotFoundException } from '@nestjs/common';
import { PublicComicService } from '../../../../../src/modules/comic/public/services/comic.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockComicRepo() {
  return {
    findManyPublic: jest.fn().mockResolvedValue([]),
    count: jest.fn().mockResolvedValue(0),
    findBySlug: jest.fn(),
    findIdBySlug: jest.fn(),
    findPublicChapters: jest.fn().mockResolvedValue([]),
    countPublicChapters: jest.fn().mockResolvedValue(0),
  };
}

function makeMockRedis() {
  return {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
    incr: jest.fn().mockResolvedValue(1),
    setnx: jest.fn().mockResolvedValue(true),
    pfadd: jest.fn().mockResolvedValue(1),
    expire: jest.fn().mockResolvedValue(1),
    hincrby: jest.fn().mockResolvedValue(1),
    isEnabled: jest.fn().mockReturnValue(true),
  };
}

function makeMockI18n() {
  return { t: jest.fn((key: string) => key) };
}

function buildService() {
  const comicRepo = makeMockComicRepo();
  const i18n = makeMockI18n();
  const redis = makeMockRedis();

  const service = new PublicComicService(
    comicRepo as any,
    i18n as any,
    redis as any,
  );

  return { service, comicRepo, i18n, redis };
}

const sampleComic = {
  id: 1n,
  title: 'Test Comic',
  slug: 'test-comic',
  categoryLinks: [{ category: { id: 10n, name: 'Action' } }],
  chapters: [{ id: 100n, title: 'Ch 1', chapter_index: 1, chapter_label: 'Ch 1', created_at: new Date() }],
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('PublicComicService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // getList()
  // -----------------------------------------------------------------------
  describe('getList()', () => {
    it('returns data from DB on cache miss', async () => {
      const { service, comicRepo, redis } = buildService();
      comicRepo.findManyPublic.mockResolvedValue([sampleComic]);
      comicRepo.count.mockResolvedValue(1);

      const result = await service.getList({});

      expect(result.data).toHaveLength(1);
      expect(result.data[0].categories).toEqual([{ id: 10n, name: 'Action' }]);
      expect(result.data[0].categoryLinks).toBeUndefined();
      expect(result.data[0].last_chapter).toBeDefined();
      expect(redis.set).toHaveBeenCalled();
    });

    it('returns cached result on cache hit', async () => {
      const { service, comicRepo, redis } = buildService();
      const cached = { data: [{ title: 'Cached' }], meta: { total: 1 } };
      redis.get.mockResolvedValue(JSON.stringify(cached));

      const result = await service.getList({});

      expect(result).toEqual(cached);
      expect(comicRepo.findManyPublic).not.toHaveBeenCalled();
    });

    it('applies search filter', async () => {
      const { service, comicRepo } = buildService();
      comicRepo.findManyPublic.mockResolvedValue([]);

      await service.getList({ search: 'naruto' });

      expect(comicRepo.findManyPublic).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'naruto' }),
        expect.anything(),
      );
    });
  });

  // -----------------------------------------------------------------------
  // getBySlug()
  // -----------------------------------------------------------------------
  describe('getBySlug()', () => {
    it('returns comic detail on cache miss', async () => {
      const { service, comicRepo } = buildService();
      comicRepo.findBySlug.mockResolvedValue(sampleComic);

      const result = await service.getBySlug('test-comic');

      expect(result).toBeDefined();
      expect(comicRepo.findBySlug).toHaveBeenCalledWith('test-comic', ['published']);
    });

    it('throws NotFoundException when slug not found', async () => {
      const { service, comicRepo } = buildService();
      comicRepo.findBySlug.mockResolvedValue(null);

      await expect(service.getBySlug('not-found')).rejects.toThrow(NotFoundException);
    });

    it('returns cached detail on hit', async () => {
      const { service, comicRepo, redis } = buildService();
      redis.get.mockResolvedValue(JSON.stringify({ title: 'Cached' }));

      const result = await service.getBySlug('test');

      expect(result).toEqual({ title: 'Cached' });
      expect(comicRepo.findBySlug).not.toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // getChaptersBySlug()
  // -----------------------------------------------------------------------
  describe('getChaptersBySlug()', () => {
    it('returns chapters and increments view count for new requester', async () => {
      const { service, comicRepo, redis } = buildService();
      comicRepo.findIdBySlug.mockResolvedValue({ id: 1n });
      comicRepo.findPublicChapters.mockResolvedValue([{ id: 100n }]);
      comicRepo.countPublicChapters.mockResolvedValue(1);
      redis.pfadd.mockResolvedValue(1);

      const result = await service.getChaptersBySlug('test', {}, 'user-ip');

      expect(result.data).toHaveLength(1);
      expect(redis.pfadd).toHaveBeenCalledWith(
        expect.stringContaining('comic:views:hll:'),
        'user-ip',
      );
      expect(redis.hincrby).toHaveBeenCalledWith('comic:views:buffer', '1', 1);
    });

    it('does not increment view count for duplicate requester', async () => {
      const { service, comicRepo, redis } = buildService();
      comicRepo.findIdBySlug.mockResolvedValue({ id: 1n });
      comicRepo.findPublicChapters.mockResolvedValue([]);
      comicRepo.countPublicChapters.mockResolvedValue(0);
      redis.pfadd.mockResolvedValue(0);

      await service.getChaptersBySlug('test', {}, 'user-ip');

      expect(redis.hincrby).not.toHaveBeenCalled();
    });

    it('skips view tracking when no requesterKey', async () => {
      const { service, comicRepo, redis } = buildService();
      comicRepo.findIdBySlug.mockResolvedValue({ id: 1n });
      comicRepo.findPublicChapters.mockResolvedValue([]);
      comicRepo.countPublicChapters.mockResolvedValue(0);

      await service.getChaptersBySlug('test', {});

      expect(redis.pfadd).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when comic not found by slug', async () => {
      const { service, comicRepo } = buildService();
      comicRepo.findIdBySlug.mockResolvedValue(null);

      await expect(service.getChaptersBySlug('unknown', {})).rejects.toThrow(NotFoundException);
    });
  });
});
