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
jest.mock('../../../../src/modules/homepage/repositories/homepage.repository', () => ({
  HomepageRepository: jest.fn(),
}));

jest.mock('../../../../src/modules/comic/enums/comic-status.enum', () => ({
  ComicStatus: { published: 'published' },
  PUBLIC_COMIC_STATUSES: ['published'],
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { HomepageService } from '../../../../src/modules/homepage/services/homepage.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockHomepageRepo() {
  return {
    findComics: jest.fn().mockResolvedValue([]),
    findCategories: jest.fn().mockResolvedValue([]),
  };
}

function buildService() {
  const homepageRepo = makeMockHomepageRepo();
  const service = new HomepageService(homepageRepo as any);
  return { service, homepageRepo };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('HomepageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTopViewed()', () => {
    it('calls findComics with view_count desc order', async () => {
      const { service, homepageRepo } = buildService();
      const comics = [{ id: 1n, title: 'Top' }];
      homepageRepo.findComics.mockResolvedValue(comics);

      const result = await service.getTopViewed(10);

      expect(result).toEqual(comics);
      expect(homepageRepo.findComics).toHaveBeenCalledWith(
        ['published'],
        { stats: { view_count: 'desc' } },
        10,
      );
    });
  });

  describe('getPopular()', () => {
    it('calls findComics with follow_count desc order', async () => {
      const { service, homepageRepo } = buildService();
      await service.getPopular(5);

      expect(homepageRepo.findComics).toHaveBeenCalledWith(
        ['published'],
        { stats: { follow_count: 'desc' } },
        5,
      );
    });
  });

  describe('getNewest()', () => {
    it('calls findComics with created_at desc order', async () => {
      const { service, homepageRepo } = buildService();
      await service.getNewest(10);

      expect(homepageRepo.findComics).toHaveBeenCalledWith(
        ['published'],
        { created_at: 'desc' },
        10,
      );
    });
  });

  describe('getRecentlyUpdated()', () => {
    it('calls findComics with last_chapter_updated_at desc order', async () => {
      const { service, homepageRepo } = buildService();
      await service.getRecentlyUpdated(10);

      expect(homepageRepo.findComics).toHaveBeenCalledWith(
        ['published'],
        { last_chapter_updated_at: 'desc' },
        10,
      );
    });
  });

  describe('getCategories()', () => {
    it('returns categories from repo', async () => {
      const { service, homepageRepo } = buildService();
      const categories = [{ id: 1n, name: 'Action' }];
      homepageRepo.findCategories.mockResolvedValue(categories);

      const result = await service.getCategories();

      expect(result).toEqual(categories);
    });
  });
});
