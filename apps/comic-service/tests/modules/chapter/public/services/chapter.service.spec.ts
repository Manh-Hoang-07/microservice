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
jest.mock('../../../../../src/modules/chapter/repositories/chapter.repository', () => ({
  ChapterRepository: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { NotFoundException } from '@nestjs/common';
import { PublicChapterService } from '../../../../../src/modules/chapter/public/services/chapter.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockChapterRepo() {
  return {
    findPublicOne: jest.fn(),
    findPages: jest.fn().mockResolvedValue([]),
    findById: jest.fn(),
    findPublishedNeighbor: jest.fn(),
  };
}

function makeMockRedis() {
  return {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    isEnabled: jest.fn().mockReturnValue(true),
  };
}

function makeMockI18n() {
  return { t: jest.fn((key: string) => key) };
}

function makeMockCacheVersion() {
  return {
    bump: jest.fn().mockResolvedValue(undefined),
    getVersion: jest.fn().mockResolvedValue(0),
  };
}

function buildService() {
  const chapterRepo = makeMockChapterRepo();
  const i18n = makeMockI18n();
  const redis = makeMockRedis();
  const cacheVersion = makeMockCacheVersion();

  const service = new PublicChapterService(
    chapterRepo as any,
    i18n as any,
    cacheVersion as any,
    redis as any,
  );

  return { service, chapterRepo, i18n, redis, cacheVersion };
}

const sampleChapter = {
  id: 1n,
  title: 'Chapter 1',
  chapterIndex: 1,
  comicId: 10n,
  status: 'published',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('PublicChapterService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // getOne()
  // -----------------------------------------------------------------------
  describe('getOne()', () => {
    it('returns chapter on cache miss', async () => {
      const { service, chapterRepo } = buildService();
      chapterRepo.findPublicOne.mockResolvedValue(sampleChapter);

      const result = await service.getOne(1n);

      expect(result).toEqual(sampleChapter);
      expect(chapterRepo.findPublicOne).toHaveBeenCalledWith(1n);
    });

    it('returns cached chapter on hit', async () => {
      const { service, chapterRepo, redis } = buildService();
      redis.get.mockResolvedValue(JSON.stringify(sampleChapter, (_, v) => typeof v === 'bigint' ? Number(v) : v));

      const result = await service.getOne(1n);

      expect(chapterRepo.findPublicOne).not.toHaveBeenCalled();
      expect(result.title).toBe('Chapter 1');
    });

    it('throws NotFoundException when chapter not found', async () => {
      const { service, chapterRepo } = buildService();
      chapterRepo.findPublicOne.mockResolvedValue(null);

      await expect(service.getOne(999n)).rejects.toThrow(NotFoundException);
    });
  });

  // -----------------------------------------------------------------------
  // getPages()
  // -----------------------------------------------------------------------
  describe('getPages()', () => {
    it('returns pages for a chapter', async () => {
      const { service, chapterRepo } = buildService();
      const pages = [{ id: 1n, page_number: 1, image_url: 'https://img/1.jpg' }];
      chapterRepo.findPublicOne.mockResolvedValue(sampleChapter);
      chapterRepo.findPages.mockResolvedValue(pages);

      const result = await service.getPages(1n);

      expect(result.data).toEqual(pages);
    });

    it('throws NotFoundException when chapter not found for pages', async () => {
      const { service, chapterRepo } = buildService();
      chapterRepo.findPublicOne.mockResolvedValue(null);

      await expect(service.getPages(999n)).rejects.toThrow(NotFoundException);
    });
  });

  // -----------------------------------------------------------------------
  // getNext() / getPrev()
  // -----------------------------------------------------------------------
  describe('getNext()', () => {
    it('returns next chapter', async () => {
      const { service, chapterRepo } = buildService();
      chapterRepo.findById.mockResolvedValue(sampleChapter);
      chapterRepo.findPublishedNeighbor.mockResolvedValue({ id: 2n, chapter_index: 2 });

      const result = await service.getNext(1n);

      expect(result).toEqual({ id: 2n, chapter_index: 2 });
      expect(chapterRepo.findPublishedNeighbor).toHaveBeenCalledWith(10n, 1, 'next');
    });

    it('returns null when no next chapter', async () => {
      const { service, chapterRepo } = buildService();
      chapterRepo.findById.mockResolvedValue(sampleChapter);
      chapterRepo.findPublishedNeighbor.mockResolvedValue(null);

      const result = await service.getNext(1n);

      expect(result).toBeNull();
    });

    it('throws NotFoundException for invalid chapter id', async () => {
      const { service, chapterRepo } = buildService();
      chapterRepo.findById.mockResolvedValue(null);

      await expect(service.getNext(999n)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPrev()', () => {
    it('returns previous chapter', async () => {
      const { service, chapterRepo } = buildService();
      chapterRepo.findById.mockResolvedValue({ ...sampleChapter, chapterIndex: 3 });
      chapterRepo.findPublishedNeighbor.mockResolvedValue({ id: 2n, chapter_index: 2 });

      const result = await service.getPrev(3n);

      expect(result).toEqual({ id: 2n, chapter_index: 2 });
      expect(chapterRepo.findPublishedNeighbor).toHaveBeenCalledWith(10n, 3, 'prev');
    });

    it('throws NotFoundException for invalid chapter id', async () => {
      const { service, chapterRepo } = buildService();
      chapterRepo.findById.mockResolvedValue(null);

      await expect(service.getPrev(999n)).rejects.toThrow(NotFoundException);
    });
  });
});
