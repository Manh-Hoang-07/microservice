// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

jest.mock('src/types', () => ({ toPrimaryKey: (v: string) => BigInt(v) }), { virtual: true });

jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });

jest.mock('../../../../../../src/modules/system-config/general/repositories/general-config.repository', () => ({
  GeneralConfigRepository: jest.fn(),
}));

jest.mock('../../../../../../src/modules/system-config/general/admin/services/general-config.service', () => ({
  GeneralConfigService: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { PublicGeneralConfigService } from '../../../../../../src/modules/system-config/general/public/services/general-config.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockGeneralConfigService() {
  return {
    getConfig: jest.fn().mockResolvedValue(null),
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
describe('PublicGeneralConfigService', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getConfig', () => {
    it('should return cached config from Redis', async () => {
      const redis = makeMockRedis();
      const cached = { siteName: 'Cached', contactChannels: [] };
      redis.get.mockResolvedValue(JSON.stringify(cached));

      const service = new PublicGeneralConfigService(
        makeMockGeneralConfigService() as any,
        redis as any,
      );

      const result = await service.getConfig();
      expect(result).toEqual(cached);
    });

    it('should fetch from admin service on cache miss', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({
        siteName: 'My Site',
        contactChannels: '[{"type":"email","value":"a@b.com"}]',
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();

      expect(result.siteName).toBe('My Site');
      expect(result.contactChannels).toEqual([{ type: 'email', value: 'a@b.com' }]);
    });

    it('should return empty object when config is null', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue(null);

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();

      expect(result).toEqual({ contactChannels: [] });
    });

    it('should handle contactChannels as array', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({
        contactChannels: [{ type: 'phone', value: '123' }],
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();
      expect(result.contactChannels).toEqual([{ type: 'phone', value: '123' }]);
    });

    it('should handle invalid JSON contactChannels string', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({
        contactChannels: 'not-valid-json',
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();
      expect(result.contactChannels).toEqual([]);
    });

    it('should handle non-array contactChannels', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({
        contactChannels: '{"not":"an-array"}',
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();
      expect(result.contactChannels).toEqual([]);
    });

    it('should set contactChannels to [] when missing', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({
        siteName: 'NoChannels',
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();
      expect(result.contactChannels).toEqual([]);
    });

    it('should work without Redis', async () => {
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({ siteName: 'X' });

      const service = new PublicGeneralConfigService(
        configService as any,
        undefined,
      );

      const result = await service.getConfig();
      expect(result.siteName).toBe('X');
    });
  });
});
