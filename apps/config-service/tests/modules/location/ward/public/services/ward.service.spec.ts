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
describe('PublicWardService', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getList', () => {
    it('should fetch active wards on cache miss', async () => {
      const redis = makeMockRedis();
      const wardService = makeMockWardService();
      wardService.getList.mockResolvedValue({ data: [{ id: '1' }] });

      const service = new PublicWardService(wardService as any, redis as any);

      const result = await service.getList();
      expect(result).toEqual({ data: [{ id: '1' }] });
      expect(wardService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'active' }),
      );
    });

    it('should return cached value', async () => {
      const redis = makeMockRedis();
      redis.get.mockResolvedValue(JSON.stringify({ data: [{ id: '1' }] }));

      const wardService = makeMockWardService();
      const service = new PublicWardService(wardService as any, redis as any);

      const result = await service.getList();
      expect(result).toEqual({ data: [{ id: '1' }] });
      expect(wardService.getList).not.toHaveBeenCalled();
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
      const redis = makeMockRedis();
      const wardService = makeMockWardService();

      const service = new PublicWardService(wardService as any, redis as any);

      await service.getByProvince('10');
      expect(wardService.getList).toHaveBeenCalledWith(
        expect.objectContaining({ province_id: '10', status: 'active' }),
      );
    });

    it('should return cached wards by province', async () => {
      const redis = makeMockRedis();
      redis.get.mockResolvedValue(JSON.stringify({ data: [{ id: '100' }] }));

      const wardService = makeMockWardService();
      const service = new PublicWardService(wardService as any, redis as any);

      const result = await service.getByProvince('10');
      expect(result).toEqual({ data: [{ id: '100' }] });
      expect(wardService.getList).not.toHaveBeenCalled();
    });
  });
});
