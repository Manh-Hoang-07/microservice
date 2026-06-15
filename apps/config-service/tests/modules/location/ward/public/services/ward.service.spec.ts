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

jest.mock('../../../../../../src/modules/location/ward/repositories/ward.repository', () => ({
  WardRepository: jest.fn(),
}));

jest.mock('../../../../../../src/modules/location/ward/admin/services/ward.service', () => ({
  WardService: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { PublicWardService } from '../../../../../../src/modules/location/ward/public/services/ward.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
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
describe('PublicWardService', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getList', () => {
    it('should fetch active wards on cache miss with a versioned wards key', async () => {
      const redis = makeFakeRedis();
      const wardService = makeMockWardService();
      wardService.getList.mockResolvedValue({ data: [{ id: '1' }] });

      const service = new PublicWardService(wardService as any, redis as any);

      const result = await service.getList();
      expect(result).toEqual({ data: [{ id: '1' }] });
      expect(wardService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'active' }),
      );
      expect(redis.setCalls[0].key).toMatch(/^config:public:wards:list:v0:/);
    });

    it('serves identical query from cache (loader runs once)', async () => {
      const redis = makeFakeRedis();
      const wardService = makeMockWardService();
      wardService.getList.mockResolvedValue({ data: [{ id: '1' }] });

      const service = new PublicWardService(wardService as any, redis as any);

      await service.getList();
      const second = await service.getList();
      expect(second).toEqual({ data: [{ id: '1' }] });
      expect(wardService.getList).toHaveBeenCalledTimes(1);
    });

    it('should work without Redis', async () => {
      const wardService = makeMockWardService();
      const service = new PublicWardService(wardService as any, undefined);
      await service.getList();
      expect(wardService.getList).toHaveBeenCalled();
    });
  });

  describe('getByProvince', () => {
    it('should fetch wards by province id', async () => {
      const redis = makeFakeRedis();
      const wardService = makeMockWardService();

      const service = new PublicWardService(wardService as any, redis as any);

      await service.getByProvince('10');
      expect(wardService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ provinceId: '10', status: 'active' }),
      );
    });

    it('uses distinct keys per province (no stale cross-province data)', async () => {
      const redis = makeFakeRedis();
      const wardService = makeMockWardService();
      const service = new PublicWardService(wardService as any, redis as any);

      await service.getByProvince('10');
      await service.getByProvince('20');

      expect(new Set(redis.setCalls.map((c) => c.key)).size).toBe(2);
      expect(wardService.getList).toHaveBeenCalledTimes(2);
    });
  });
});
