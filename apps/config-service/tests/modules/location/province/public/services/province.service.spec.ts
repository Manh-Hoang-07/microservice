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

jest.mock('../../../../../../src/modules/location/province/repositories/province.repository', () => ({
  ProvinceRepository: jest.fn(),
}));

jest.mock('../../../../../../src/modules/location/ward/repositories/ward.repository', () => ({
  WardRepository: jest.fn(),
}));

jest.mock('../../../../../../src/modules/location/province/admin/services/province.service', () => ({
  ProvinceService: jest.fn(),
}));

jest.mock('../../../../../../src/modules/location/ward/admin/services/ward.service', () => ({
  WardService: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { PublicProvinceService } from '../../../../../../src/modules/location/province/public/services/province.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockProvinceService() {
  return {
    getList: jest.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
  };
}

function makeMockWardService() {
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
describe('PublicProvinceService', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getList', () => {
    it('should fetch active provinces on cache miss', async () => {
      const redis = makeMockRedis();
      const provinceService = makeMockProvinceService();
      provinceService.getList.mockResolvedValue({ data: [{ id: '1' }] });

      const service = new PublicProvinceService(
        provinceService as any,
        makeMockWardService() as any,
        redis as any,
      );

      const result = await service.getList();
      expect(result).toEqual({ data: [{ id: '1' }] });
      expect(provinceService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'active' }),
      );
    });

    it('should return cached value', async () => {
      const redis = makeMockRedis();
      redis.get.mockResolvedValue(JSON.stringify({ data: [{ id: '1' }] }));

      const provinceService = makeMockProvinceService();
      const service = new PublicProvinceService(
        provinceService as any,
        makeMockWardService() as any,
        redis as any,
      );

      const result = await service.getList();
      expect(result).toEqual({ data: [{ id: '1' }] });
      expect(provinceService.getList).not.toHaveBeenCalled();
    });
  });

  describe('getByCountry', () => {
    it('should fetch provinces by country id', async () => {
      const redis = makeMockRedis();
      const provinceService = makeMockProvinceService();

      const service = new PublicProvinceService(
        provinceService as any,
        makeMockWardService() as any,
        redis as any,
      );

      await service.getByCountry('5');
      expect(provinceService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ country_id: '5', status: 'active' }),
      );
    });
  });

  describe('getWards', () => {
    it('should fetch wards by province id', async () => {
      const redis = makeMockRedis();
      const wardService = makeMockWardService();

      const service = new PublicProvinceService(
        makeMockProvinceService() as any,
        wardService as any,
        redis as any,
      );

      await service.getWards('10');
      expect(wardService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ province_id: '10', status: 'active' }),
      );
    });

    it('should return cached wards', async () => {
      const redis = makeMockRedis();
      redis.get.mockResolvedValue(JSON.stringify({ data: [{ id: '100' }] }));

      const wardService = makeMockWardService();
      const service = new PublicProvinceService(
        makeMockProvinceService() as any,
        wardService as any,
        redis as any,
      );

      const result = await service.getWards('10');
      expect(result).toEqual({ data: [{ id: '100' }] });
      expect(wardService.getList).not.toHaveBeenCalled();
    });
  });
});
