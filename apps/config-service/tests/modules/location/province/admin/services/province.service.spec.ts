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

jest.mock('../../../../../../src/modules/location/province/repositories/province.repository', () => ({
  ProvinceRepository: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { NotFoundException, ConflictException } from '@nestjs/common';
import { ProvinceService } from '../../../../../../src/modules/location/province/admin/services/province.service';

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
    countWards: jest.fn().mockResolvedValue(0),
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
  const service = new ProvinceService(repo as any, i18n as any, cacheVersion as any);
  return { service, repo, i18n, cacheVersion };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('ProvinceService (admin)', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getList', () => {
    it('should return paginated data with filters', async () => {
      const { service, repo } = createService();
      repo.findMany.mockResolvedValue([{ id: '1' }]);
      repo.count.mockResolvedValue(1);

      const result = await service.getList({
        name: 'HN', status: 'active', code: '01', country_id: '1',
      });

      expect(result.data).toHaveLength(1);
    });

    it('should skip count when skipCount is "true" (string)', async () => {
      const { service, repo } = createService();
      await service.getList({ skipCount: 'true' });
      expect(repo.count).not.toHaveBeenCalled();
    });
  });

  describe('getSimpleList', () => {
    it('should delegate to getList', async () => {
      const { service } = createService();
      const result = await service.getSimpleList();
      expect(result).toBeDefined();
    });
  });

  describe('getOne', () => {
    it('should return province when found', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1', name: 'Ha Noi' });
      expect(await service.getOne('1')).toEqual({ id: '1', name: 'Ha Noi' });
    });

    it('should throw NotFoundException when not found', async () => {
      const { service } = createService();
      await expect(service.getOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and bump the provinces cache version', async () => {
      const { service, cacheVersion } = createService();
      const result = await service.create({ name: 'HCM' });
      expect(result).toBeDefined();
      expect(cacheVersion.bump).toHaveBeenCalledWith('config:public:provinces');
    });
  });

  describe('update', () => {
    it('should update and clear cache', async () => {
      const { service, repo, redis } = createService();
      repo.findById.mockResolvedValue({ id: '1' });
      repo.update.mockResolvedValue({ id: '1', name: 'Updated' });

      const result = await service.update('1', { name: 'Updated' });

      expect(result).toEqual({ id: '1', name: 'Updated' });
    });

    it('should throw NotFoundException for non-existent province', async () => {
      const { service } = createService();
      await expect(service.update('999', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete province with no wards', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1' });
      repo.countWards.mockResolvedValue(0);

      expect(await service.delete('1')).toBe(true);
    });

    it('should throw ConflictException when province has wards', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1' });
      repo.countWards.mockResolvedValue(3);

      await expect(service.delete('1')).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException for non-existent province', async () => {
      const { service } = createService();
      await expect(service.delete('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('cache invalidation', () => {
    it('bumps the provinces version on update', async () => {
      const { service, repo, cacheVersion } = createService();
      repo.findById.mockResolvedValue({ id: '1' });
      await service.update('1', { name: 'X' });
      expect(cacheVersion.bump).toHaveBeenCalledWith('config:public:provinces');
    });

    it('bumps the provinces version on delete', async () => {
      const { service, repo, cacheVersion } = createService();
      repo.findById.mockResolvedValue({ id: '1' });
      repo.countWards.mockResolvedValue(0);
      await service.delete('1');
      expect(cacheVersion.bump).toHaveBeenCalledWith('config:public:provinces');
    });
  });
});
