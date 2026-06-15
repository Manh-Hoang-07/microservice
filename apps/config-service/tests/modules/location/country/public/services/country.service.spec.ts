// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

// Keep the real CachedService (pure, crypto-based) but stub RedisService class.
jest.mock('@package/redis', () => ({
  ...jest.requireActual('@package/redis'),
  RedisService: jest.fn(),
}));

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

/** Map-backed fake Redis tracking keys actually written. */
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
describe('PublicCountryService', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getList', () => {
    it('should fetch from admin service on cache miss and write a versioned key', async () => {
      const redis = makeFakeRedis();
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
      // Dynamic, version-aware key under the countries entity.
      expect(redis.setCalls[0].key).toMatch(/^config:public:countries:list:v0:[0-9a-f]{16}$/);
    });

    it('serves a second identical query from cache (loader runs once)', async () => {
      const redis = makeFakeRedis();
      const countryService = makeMockCountryService();
      countryService.getList.mockResolvedValue({ data: [{ id: '1' }] });

      const service = new PublicCountryService(
        countryService as any,
        makeMockProvinceService() as any,
        redis as any,
      );

      await service.getList();
      const second = await service.getList();
      expect(second).toEqual({ data: [{ id: '1' }] });
      expect(countryService.getList).toHaveBeenCalledTimes(1);
    });

    it('uses distinct keys for different query variants (no collision)', async () => {
      const redis = makeFakeRedis();
      const countryService = makeMockCountryService();
      const service = new PublicCountryService(
        countryService as any,
        makeMockProvinceService() as any,
        redis as any,
      );

      await service.getList({ page: 1, search: 'a' });
      await service.getList({ page: 2, search: 'a' });
      await service.getList({ page: 1, search: 'b' });

      expect(new Set(redis.setCalls.map((c) => c.key)).size).toBe(3);
      expect(countryService.getList).toHaveBeenCalledTimes(3);
    });

    it('should work without Redis (passthrough)', async () => {
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
    it('should return provinces for a country under the provinces entity key', async () => {
      const redis = makeFakeRedis();
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
        expect.objectContaining({ countryId: '1', status: 'active' }),
      );
      expect(redis.setCalls[0].key).toMatch(/^config:public:provinces:list:v0:/);
    });

    it('uses distinct keys per country (no cross-country collision)', async () => {
      const redis = makeFakeRedis();
      const provinceService = makeMockProvinceService();
      const service = new PublicCountryService(
        makeMockCountryService() as any,
        provinceService as any,
        redis as any,
      );

      await service.getProvinces('1');
      await service.getProvinces('2');

      expect(new Set(redis.setCalls.map((c) => c.key)).size).toBe(2);
      expect(provinceService.getList).toHaveBeenCalledTimes(2);
    });
  });
});
