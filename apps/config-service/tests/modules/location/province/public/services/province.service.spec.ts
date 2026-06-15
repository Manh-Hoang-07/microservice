// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('@package/redis', () => ({
  ...jest.requireActual('@package/redis'),
  RedisService: jest.fn(),
}));

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

function makeFakeRedis() {
  const store = new Map<string, string>();
  const setCalls: Array<{ key: string; value: string }> = [];
  return {
    store,
    setCalls,
    isEnabled: jest.fn().mockReturnValue(true),
    get: jest.fn(async (k: string) => (store.has(k) ? store.get(k)! : null)),
    set: jest.fn(async (k: string, v: string) => {
      store.set(k, v);
      setCalls.push({ key: k, value: v });
    }),
    incr: jest.fn(async (k: string) => {
      const n = Number(store.get(k) ?? '0') + 1;
      store.set(k, String(n));
      return n;
    }),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('PublicProvinceService', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getList', () => {
    it('should fetch active provinces on cache miss with versioned provinces key', async () => {
      const redis = makeFakeRedis();
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
      expect(redis.setCalls[0].key).toMatch(/^config:public:provinces:list:v0:/);
    });

    it('uses distinct keys for different query variants', async () => {
      const redis = makeFakeRedis();
      const provinceService = makeMockProvinceService();
      const service = new PublicProvinceService(
        provinceService as any,
        makeMockWardService() as any,
        redis as any,
      );

      await service.getList({ page: 1 });
      await service.getList({ page: 2 });
      await service.getList({ page: 1, search: 'x' });

      expect(new Set(redis.setCalls.map((c) => c.key)).size).toBe(3);
      expect(provinceService.getList).toHaveBeenCalledTimes(3);
    });

    it('serves identical query from cache (loader runs once)', async () => {
      const redis = makeFakeRedis();
      const provinceService = makeMockProvinceService();
      provinceService.getList.mockResolvedValue({ data: [{ id: '1' }] });

      const service = new PublicProvinceService(
        provinceService as any,
        makeMockWardService() as any,
        redis as any,
      );

      await service.getList();
      const second = await service.getList();
      expect(second).toEqual({ data: [{ id: '1' }] });
      expect(provinceService.getList).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByCountry', () => {
    it('should fetch provinces by country id', async () => {
      const redis = makeFakeRedis();
      const provinceService = makeMockProvinceService();

      const service = new PublicProvinceService(
        provinceService as any,
        makeMockWardService() as any,
        redis as any,
      );

      await service.getByCountry('5');
      expect(provinceService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ countryId: '5', status: 'active' }),
      );
    });

    it('uses distinct keys per country', async () => {
      const redis = makeFakeRedis();
      const provinceService = makeMockProvinceService();
      const service = new PublicProvinceService(
        provinceService as any,
        makeMockWardService() as any,
        redis as any,
      );

      await service.getByCountry('5');
      await service.getByCountry('6');
      expect(new Set(redis.setCalls.map((c) => c.key)).size).toBe(2);
    });
  });

  describe('getWards', () => {
    it('should fetch wards by province id under the wards entity key', async () => {
      const redis = makeFakeRedis();
      const wardService = makeMockWardService();

      const service = new PublicProvinceService(
        makeMockProvinceService() as any,
        wardService as any,
        redis as any,
      );

      await service.getWards('10');
      expect(wardService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ provinceId: '10', status: 'active' }),
      );
      expect(redis.setCalls[0].key).toMatch(/^config:public:wards:list:v0:/);
    });
  });
});
