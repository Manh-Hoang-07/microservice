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
      const cached = { site_name: 'Cached', contact_channels: [] };
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
        site_name: 'My Site',
        contact_channels: '[{"type":"email","value":"a@b.com"}]',
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();

      expect(result.site_name).toBe('My Site');
      expect(result.contact_channels).toEqual([{ type: 'email', value: 'a@b.com' }]);
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

      expect(result).toEqual({ contact_channels: [] });
    });

    it('should handle contact_channels as array', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({
        contact_channels: [{ type: 'phone', value: '123' }],
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();
      expect(result.contact_channels).toEqual([{ type: 'phone', value: '123' }]);
    });

    it('should handle invalid JSON contact_channels string', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({
        contact_channels: 'not-valid-json',
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();
      expect(result.contact_channels).toEqual([]);
    });

    it('should handle non-array contact_channels', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({
        contact_channels: '{"not":"an-array"}',
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();
      expect(result.contact_channels).toEqual([]);
    });

    it('should set contact_channels to [] when missing', async () => {
      const redis = makeMockRedis();
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({
        site_name: 'NoChannels',
      });

      const service = new PublicGeneralConfigService(
        configService as any,
        redis as any,
      );

      const result = await service.getConfig();
      expect(result.contact_channels).toEqual([]);
    });

    it('should work without Redis', async () => {
      const configService = makeMockGeneralConfigService();
      configService.getConfig.mockResolvedValue({ site_name: 'X' });

      const service = new PublicGeneralConfigService(
        configService as any,
        undefined,
      );

      const result = await service.getConfig();
      expect(result.site_name).toBe('X');
    });
  });
});
