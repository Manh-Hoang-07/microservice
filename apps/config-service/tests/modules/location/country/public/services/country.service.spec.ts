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

jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

jest.mock('src/types', () => ({ toPrimaryKey: (v: string) => BigInt(v) }), { virtual: true });

jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });

jest.mock('../../../../../../src/modules/location/country/repositories/country.repository', () => ({
  CountryRepository: jest.fn(),
}));

jest.mock('../../../../../../src/modules/location/province/repositories/province.repository', () => ({
  ProvinceRepository: jest.fn(),
}));

jest.mock('../../../../../../src/modules/location/country/admin/services/country.service', () => ({
  CountryService: jest.fn(),
}));

jest.mock('../../../../../../src/modules/location/province/admin/services/province.service', () => ({
  ProvinceService: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { PublicCountryService } from '../../../../../../src/modules/location/country/public/services/country.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockCountryService() {
  return {
    getList: jest.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
  };
}

function makeMockProvinceService() {
  return {
    getList: jest.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
  };
}

function makeMockRedis(enabled = true) {
  return {
    isEnabled: jest.fn().mockReturnValue(enabled),
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('PublicCountryService', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getList', () => {
    it('should return cached countries from Redis', async () => {
      const redis = makeMockRedis();
      const cached = { data: [{ id: '1', name: 'VN' }], meta: { total: 1 } };
      redis.get.mockResolvedValue(JSON.stringify(cached));

      const service = new PublicCountryService(
        makeMockCountryService() as any,
        makeMockProvinceService() as any,
        redis as any,
      );

      const result = await service.getList();
      expect(result).toEqual(cached);
    });

    it('should fetch from admin service on cache miss', async () => {
      const redis = makeMockRedis();
      const countryService = makeMockCountryService();
      countryService.getList.mockResolvedValue({ data: [{ id: '1' }], meta: { total: 1 } });

      const service = new PublicCountryService(
        countryService as any,
        makeMockProvinceService() as any,
        redis as any,
      );

      const result = await service.getList();
      expect(result).toEqual({ data: [{ id: '1' }], meta: { total: 1 } });
      expect(countryService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'active' }),
      );
    });

    it('should work without Redis', async () => {
      const countryService = makeMockCountryService();
      const service = new PublicCountryService(
        countryService as any,
        makeMockProvinceService() as any,
        undefined,
      );

      await service.getList();
      expect(countryService.getList).toHaveBeenCalled();
    });
  });

  describe('getProvinces', () => {
    it('should return provinces for a country', async () => {
      const redis = makeMockRedis();
      const provinceService = makeMockProvinceService();
      provinceService.getList.mockResolvedValue({ data: [{ id: '10' }], meta: { total: 1 } });

      const service = new PublicCountryService(
        makeMockCountryService() as any,
        provinceService as any,
        redis as any,
      );

      const result = await service.getProvinces('1');
      expect(result).toEqual({ data: [{ id: '10' }], meta: { total: 1 } });
      expect(provinceService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ country_id: '1', status: 'active' }),
      );
    });

    it('should use cached provinces', async () => {
      const redis = makeMockRedis();
      const cached = { data: [{ id: '10' }] };
      redis.get.mockResolvedValue(JSON.stringify(cached));

      const provinceService = makeMockProvinceService();
      const service = new PublicCountryService(
        makeMockCountryService() as any,
        provinceService as any,
        redis as any,
      );

      const result = await service.getProvinces('1');
      expect(result).toEqual(cached);
      expect(provinceService.getList).not.toHaveBeenCalled();
    });
  });
});
