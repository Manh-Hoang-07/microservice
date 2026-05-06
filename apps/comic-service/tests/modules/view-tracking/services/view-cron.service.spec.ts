// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
}));

jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
}), { virtual: true });

jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('../../../../src/modules/view-tracking/repositories/view-tracking.repository', () => ({
  ViewTrackingRepository: jest.fn(),
}));

jest.mock('@nestjs/schedule', () => ({
  Cron: () => (_target: any, _key: string, _desc: PropertyDescriptor) => {},
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ViewCronService } from '../../../../src/modules/view-tracking/services/view-cron.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockViewRepo() {
  return {
    upsertStats: jest.fn().mockResolvedValue(undefined),
    upsertDailyStats: jest.fn().mockResolvedValue(undefined),
  };
}

function makeMockRedis() {
  return {
    isEnabled: jest.fn().mockReturnValue(true),
    setnx: jest.fn().mockResolvedValue(true),
    rename: jest.fn().mockResolvedValue('OK'),
    hgetall: jest.fn().mockResolvedValue({}),
    del: jest.fn().mockResolvedValue(1),
    hincrby: jest.fn().mockResolvedValue(1),
  };
}

function buildService() {
  const viewRepo = makeMockViewRepo();
  const redis = makeMockRedis();

  const service = new ViewCronService(
    viewRepo as any,
    redis as any,
  );

  return { service, viewRepo, redis };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('ViewCronService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('flushViewBuffer()', () => {
    it('does nothing when redis is disabled', async () => {
      const { service, redis } = buildService();
      redis.isEnabled.mockReturnValue(false);

      await service.flushViewBuffer();

      expect(redis.setnx).not.toHaveBeenCalled();
    });

    it('does nothing when lock cannot be acquired', async () => {
      const { service, redis } = buildService();
      redis.setnx.mockResolvedValue(false);

      await service.flushViewBuffer();

      expect(redis.rename).not.toHaveBeenCalled();
    });

    it('returns early when rename fails (no buffer exists)', async () => {
      const { service, redis, viewRepo } = buildService();
      redis.rename.mockRejectedValue(new Error('ERR no such key'));

      await service.flushViewBuffer();

      expect(viewRepo.upsertStats).not.toHaveBeenCalled();
      expect(redis.del).toHaveBeenCalledWith('comic:views:buffer:lock');
    });

    it('returns early and cleans snapshot when buffer is empty', async () => {
      const { service, redis, viewRepo } = buildService();
      redis.hgetall.mockResolvedValue({});

      await service.flushViewBuffer();

      expect(viewRepo.upsertStats).not.toHaveBeenCalled();
      // snapshot key deleted
      expect(redis.del).toHaveBeenCalledTimes(2); // snapshot + lock
    });

    it('flushes valid entries to DB in batches', async () => {
      const { service, redis, viewRepo } = buildService();
      redis.hgetall.mockResolvedValue({ '1': '5', '2': '10' });

      await service.flushViewBuffer();

      expect(viewRepo.upsertStats).toHaveBeenCalledTimes(2);
      expect(viewRepo.upsertStats).toHaveBeenCalledWith(1n, 5);
      expect(viewRepo.upsertStats).toHaveBeenCalledWith(2n, 10);
      expect(viewRepo.upsertDailyStats).toHaveBeenCalledTimes(2);
    });

    it('skips invalid comic ids', async () => {
      const { service, redis, viewRepo } = buildService();
      redis.hgetall.mockResolvedValue({ 'invalid': '5', '1': '3' });

      await service.flushViewBuffer();

      expect(viewRepo.upsertStats).toHaveBeenCalledTimes(1);
      expect(viewRepo.upsertStats).toHaveBeenCalledWith(1n, 3);
    });

    it('skips entries with zero or negative counts', async () => {
      const { service, redis, viewRepo } = buildService();
      redis.hgetall.mockResolvedValue({ '1': '0', '2': '-3', '3': '5' });

      await service.flushViewBuffer();

      expect(viewRepo.upsertStats).toHaveBeenCalledTimes(1);
      expect(viewRepo.upsertStats).toHaveBeenCalledWith(3n, 5);
    });

    it('restores counts to live buffer on DB failure', async () => {
      const { service, redis, viewRepo } = buildService();
      redis.hgetall.mockResolvedValue({ '1': '5' });
      viewRepo.upsertStats.mockRejectedValue(new Error('DB down'));

      await service.flushViewBuffer();

      expect(redis.hincrby).toHaveBeenCalledWith('comic:views:buffer', '1', 5);
    });

    it('always releases lock in finally block', async () => {
      const { service, redis } = buildService();
      redis.rename.mockResolvedValue('OK');
      redis.hgetall.mockRejectedValue(new Error('unexpected'));

      await service.flushViewBuffer();

      expect(redis.del).toHaveBeenCalledWith('comic:views:buffer:lock');
    });
  });
});
