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

jest.mock('../../../../../../src/modules/system-config/helpers/config-payload.helper', () => ({
  buildConfigPayload: jest.fn((dto: any) => ({ ...dto })),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { InternalServerErrorException } from '@nestjs/common';
import { GeneralConfigService } from '../../../../../../src/modules/system-config/general/admin/services/general-config.service';
import { buildConfigPayload } from '../../../../../../src/modules/system-config/helpers/config-payload.helper';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRepo() {
  return {
    getConfig: jest.fn().mockResolvedValue(null),
    upsert: jest.fn().mockImplementation((_create: any, _update: any) =>
      Promise.resolve({ id: '1', siteName: 'My Site' }),
    ),
  };
}

function makeMockI18n() {
  return { t: jest.fn((_key: string) => _key) };
}

function makeMockRedis() {
  return { del: jest.fn().mockResolvedValue(1) };
}

function createService(overrides: any = {}) {
  const repo = overrides.repo ?? makeMockRepo();
  const i18n = overrides.i18n ?? makeMockI18n();
  const redis = overrides.redis ?? makeMockRedis();
  const service = new GeneralConfigService(repo as any, i18n as any, redis as any);
  return { service, repo, i18n, redis };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('GeneralConfigService', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getConfig', () => {
    it('should return config from repository', async () => {
      const { service, repo } = createService();
      const config = { id: '1', siteName: 'My Site' };
      repo.getConfig.mockResolvedValue(config);

      const result = await service.getConfig();
      expect(result).toEqual(config);
    });

    it('should return null when no config exists', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue(null);
      expect(await service.getConfig()).toBeNull();
    });
  });

  describe('updateConfig', () => {
    it('should upsert config with defaults and clear cache', async () => {
      const { service, repo, redis } = createService();
      repo.getConfig.mockResolvedValue(null);

      const dto = { siteName: 'New Site' };
      (buildConfigPayload as jest.Mock).mockReturnValue({ ...dto });

      const result = await service.updateConfig(dto as any, '1');

      expect(repo.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          siteName: 'New Site',
          timezone: 'Asia/Ho_Chi_Minh',
          locale: 'vi',
          currency: 'VND',
        }),
        expect.any(Object),
      );
      expect(redis.del).toHaveBeenCalledWith('config:public:general');
      expect(result).toBeDefined();
    });

    it('should use provided values over defaults', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue({ id: '1' });

      const dto = {
        siteName: 'Custom',
        timezone: 'UTC',
        locale: 'en',
        currency: 'USD',
      };
      (buildConfigPayload as jest.Mock).mockReturnValue({ ...dto });

      await service.updateConfig(dto as any);

      expect(repo.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          siteName: 'Custom',
          timezone: 'UTC',
          locale: 'en',
          currency: 'USD',
        }),
        expect.any(Object),
      );
    });

    it('should throw InternalServerErrorException when upsert returns null', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue(null);
      repo.upsert.mockResolvedValue(null);

      (buildConfigPayload as jest.Mock).mockReturnValue({ siteName: 'X' });

      await expect(service.updateConfig({ siteName: 'X' } as any))
        .rejects.toThrow(InternalServerErrorException);
    });

    it('should pass bigIntFields to buildConfigPayload', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue(null);

      const dto = { siteName: 'X' };
      (buildConfigPayload as jest.Mock).mockReturnValue({ ...dto });

      await service.updateConfig(dto as any, '1');

      expect(buildConfigPayload).toHaveBeenCalledWith(
        dto,
        ['siteCountryId', 'siteProvinceId', 'siteWardId'],
        '1',
        null,
      );
    });

    it('should work without Redis', async () => {
      const repo = makeMockRepo();
      const i18n = makeMockI18n();
      const service = new GeneralConfigService(repo as any, i18n as any, undefined);

      repo.getConfig.mockResolvedValue(null);
      (buildConfigPayload as jest.Mock).mockReturnValue({ siteName: 'NoRedis' });

      await expect(service.updateConfig({ siteName: 'NoRedis' } as any)).resolves.toBeDefined();
    });
  });
});
