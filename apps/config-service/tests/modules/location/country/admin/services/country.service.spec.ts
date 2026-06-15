// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  createPaginationMeta: jest.fn((opts: any, total: number) => ({ page: 1, total })),
  parseQueryOptions: jest.fn((q: any) => ({ skip: 0, take: q.limit ?? 20 })),
}));

jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('@package/redis', () => ({
  ...jest.requireActual('@package/redis'),
  RedisService: jest.fn(),
}));

// CacheVersionService is provided by @package/redis (no per-service wrapper).

jest.mock('src/types', () => ({ toPrimaryKey: (v: string) => BigInt(v) }), { virtual: true });

jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });

jest.mock('../../../../../../src/modules/location/country/repositories/country.repository', () => ({
  CountryRepository: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CountryService } from '../../../../../../src/modules/location/country/admin/services/country.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRepo() {
  return {
    findMany: jest.fn().mockResolvedValue([]),
    count: jest.fn().mockResolvedValue(0),
    findById: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockImplementation((dto: any) => Promise.resolve({ id: '1', ...dto })),
    update: jest.fn().mockImplementation((id: any, dto: any) => Promise.resolve({ id, ...dto })),
    delete: jest.fn().mockResolvedValue(true),
    countProvinces: jest.fn().mockResolvedValue(0),
  };
}

function makeMockI18n() {
  return { t: jest.fn((_key: string) => _key) };
}

function makeMockCacheVersion() {
  return { bump: jest.fn().mockResolvedValue(undefined) };
}

function createService(overrides: any = {}) {
  const repo = overrides.repo ?? makeMockRepo();
  const i18n = overrides.i18n ?? makeMockI18n();
  const cacheVersion = overrides.cacheVersion ?? makeMockCacheVersion();
  const service = new CountryService(repo as any, i18n as any, cacheVersion as any);
  return { service, repo, i18n, cacheVersion };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('CountryService (admin)', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getList', () => {
    it('should return paginated data', async () => {
      const { service, repo } = createService();
      repo.findMany.mockResolvedValue([{ id: '1', name: 'VN' }]);
      repo.count.mockResolvedValue(1);

      const result = await service.getList({ name: 'VN', status: 'active', code: 'VN' });

      expect(result.data).toHaveLength(1);
      expect(repo.findMany).toHaveBeenCalled();
      expect(repo.count).toHaveBeenCalled();
    });

    it('should skip count when skipCount is true', async () => {
      const { service, repo } = createService();
      await service.getList({ skipCount: true });
      expect(repo.count).not.toHaveBeenCalled();
    });
  });

  describe('getSimpleList', () => {
    it('should delegate to getList with defaults', async () => {
      const { service, repo } = createService();
      repo.findMany.mockResolvedValue([]);
      const result = await service.getSimpleList();
      expect(result).toBeDefined();
    });
  });

  describe('getOne', () => {
    it('should return country when found', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1', name: 'VN' });
      const result = await service.getOne('1');
      expect(result).toEqual({ id: '1', name: 'VN' });
    });

    it('should throw NotFoundException when not found', async () => {
      const { service } = createService();
      await expect(service.getOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and clear cache', async () => {
      const { service, repo, cacheVersion } = createService();
      const result = await service.create({ name: 'US', code: 'US' });
      expect(result).toEqual(expect.objectContaining({ name: 'US' }));
      expect(cacheVersion.bump).toHaveBeenCalledWith('config:public:countries');
    });
  });

  describe('update', () => {
    it('should update and clear cache', async () => {
      const { service, repo, cacheVersion } = createService();
      repo.findById.mockResolvedValue({ id: '1', name: 'VN' });
      repo.update.mockResolvedValue({ id: '1', name: 'Vietnam' });

      const result = await service.update('1', { name: 'Vietnam' });

      expect(result).toEqual({ id: '1', name: 'Vietnam' });
      expect(cacheVersion.bump).toHaveBeenCalledWith('config:public:countries');
    });

    it('should throw NotFoundException if country does not exist', async () => {
      const { service } = createService();
      await expect(service.update('999', { name: 'X' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete country with no provinces', async () => {
      const { service, repo, cacheVersion } = createService();
      repo.findById.mockResolvedValue({ id: '1' });
      repo.countProvinces.mockResolvedValue(0);

      const result = await service.delete('1');

      expect(result).toBe(true);
      expect(cacheVersion.bump).toHaveBeenCalledWith('config:public:countries');
    });

    it('should throw ConflictException when country has provinces', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1' });
      repo.countProvinces.mockResolvedValue(5);

      await expect(service.delete('1')).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if country does not exist', async () => {
      const { service } = createService();
      await expect(service.delete('999')).rejects.toThrow(NotFoundException);
    });
  });
});
