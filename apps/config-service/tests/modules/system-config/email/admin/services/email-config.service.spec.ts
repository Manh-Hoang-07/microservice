// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('src/types', () => ({ toPrimaryKey: (v: string) => BigInt(v) }), { virtual: true });

jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });

jest.mock('../../../../../../src/modules/system-config/email/repositories/email-config.repository', () => ({
  EmailConfigRepository: jest.fn(),
}));

jest.mock('../../../../../../src/modules/system-config/helpers/config-payload.helper', () => ({
  buildConfigPayload: jest.fn((dto: any, _bigInt: any, _userId: any, _existing: any) => ({ ...dto })),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { EmailConfigService } from '../../../../../../src/modules/system-config/email/admin/services/email-config.service';
import { buildConfigPayload } from '../../../../../../src/modules/system-config/helpers/config-payload.helper';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRepo() {
  return {
    getConfig: jest.fn().mockResolvedValue(null),
    upsert: jest.fn().mockImplementation((_create: any, _update: any) =>
      Promise.resolve({ id: '1', smtp_host: 'smtp.test.com', smtp_password: 'secret' }),
    ),
  };
}

function makeMockI18n() {
  return { t: jest.fn((_key: string) => _key) };
}

function createService(overrides: any = {}) {
  const repo = overrides.repo ?? makeMockRepo();
  const i18n = overrides.i18n ?? makeMockI18n();
  const service = new EmailConfigService(repo as any, i18n as any);
  return { service, repo, i18n };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('EmailConfigService', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('getConfig', () => {
    it('should return config with masked password', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue({
        id: '1',
        smtp_host: 'smtp.test.com',
        smtp_password: 'real-password',
      });

      const result = await service.getConfig();

      expect(result.smtp_password).toBe('******');
      expect(result.smtp_host).toBe('smtp.test.com');
    });

    it('should return null when no config exists', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue(null);

      const result = await service.getConfig();
      expect(result).toBeNull();
    });
  });

  describe('getRawConfig', () => {
    it('should return config without masking', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue({
        id: '1',
        smtp_password: 'real-password',
      });

      const result = await service.getRawConfig();
      expect(result.smtp_password).toBe('real-password');
    });
  });

  describe('updateConfig', () => {
    it('should create config on first write', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue(null);

      const dto = {
        smtp_host: 'smtp.test.com',
        smtp_username: 'user',
        smtp_password: 'pass',
        from_email: 'test@test.com',
        from_name: 'Test',
      };

      (buildConfigPayload as jest.Mock).mockReturnValue({ ...dto });

      const result = await service.updateConfig(dto as any, '1');

      expect(repo.upsert).toHaveBeenCalled();
      expect(result.smtp_password).toBe('******');
    });

    it('should throw BadRequestException when required field missing on first write', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue(null);

      const dto = { smtp_host: 'smtp.test.com' };
      (buildConfigPayload as jest.Mock).mockReturnValue({ ...dto });

      await expect(service.updateConfig(dto as any))
        .rejects.toThrow(BadRequestException);
    });

    it('should strip masked password placeholder on update', async () => {
      const { service, repo } = createService();
      const existing = { id: '1', smtp_password: 'real-pass' };
      repo.getConfig.mockResolvedValue(existing);

      const dto: any = {
        smtp_host: 'new-host',
        smtp_password: '******',
      };

      (buildConfigPayload as jest.Mock).mockImplementation((d: any) => ({ ...d }));

      await service.updateConfig(dto, '1');

      // The masked password should have been removed from dto
      expect(dto.smtp_password).toBeUndefined();
    });

    it('should strip password when existing config and no password provided', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue({ id: '1', smtp_password: 'real-pass' });

      const dto: any = { smtp_host: 'new-host' };
      (buildConfigPayload as jest.Mock).mockReturnValue({ ...dto });

      await service.updateConfig(dto, '1');

      expect(dto.smtp_password).toBeUndefined();
    });

    it('should throw InternalServerErrorException when upsert returns null', async () => {
      const { service, repo } = createService();
      repo.getConfig.mockResolvedValue({ id: '1' });
      repo.upsert.mockResolvedValue(null);

      const dto: any = { smtp_host: 'host' };
      (buildConfigPayload as jest.Mock).mockReturnValue({ ...dto });

      await expect(service.updateConfig(dto))
        .rejects.toThrow(InternalServerErrorException);
    });
  });
});
