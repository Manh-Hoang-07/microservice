// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('@package/redis', () => ({
  RedisService: jest.fn(),
}));

jest.mock('src/generated/prisma', () => ({
  PrismaClient: class {},
  Prisma: {},
}), { virtual: true });

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn(),
}), { virtual: true });

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
}), { virtual: true });

jest.mock('@nestjs/schedule', () => ({
  Cron: () => (_target: any, _key: string, _desc: PropertyDescriptor) => {},
}));

jest.mock('../../../../src/modules/stats/repositories/stats.repository', () => ({
  StatsRepository: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ViewCronService } from '../../../../src/modules/stats/services/view-cron.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockStatsRepo() {
  return {
    upsertStats: jest.fn().mockResolvedValue(undefined),
    upsertDailyStats: jest.fn().mockResolvedValue(undefined),
  };
}

function makeMockRedis() {
  return {
    isEnabled: jest.fn().mockReturnValue(true),
    acquireLock: jest.fn().mockResolvedValue(true),
    releaseLock: jest.fn().mockResolvedValue(true),
    rename: jest.fn().mockResolvedValue(undefined),
    hgetall: jest.fn().mockResolvedValue({}),
    del: jest.fn().mockResolvedValue(undefined),
    hincrby: jest.fn().mockResolvedValue(1),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('ViewCronService', () => {
  let service: ViewCronService;
  let statsRepo: ReturnType<typeof makeMockStatsRepo>;
  let redis: ReturnType<typeof makeMockRedis>;

  beforeEach(() => {
    statsRepo = makeMockStatsRepo();
    redis = makeMockRedis();
    service = new ViewCronService(statsRepo as any, redis as any);
  });

  it('should skip when redis is disabled', async () => {
    redis.isEnabled.mockReturnValue(false);
    await service.flushViewBuffer();
    expect(redis.acquireLock).not.toHaveBeenCalled();
  });

  it('should skip when lock is not acquired', async () => {
    redis.acquireLock.mockResolvedValue(false);
    await service.flushViewBuffer();
    expect(redis.rename).not.toHaveBeenCalled();
  });

  it('should return early when no buffer exists (rename throws)', async () => {
    redis.rename.mockRejectedValue(new Error('ERR no such key'));
    await service.flushViewBuffer();

    expect(redis.hgetall).not.toHaveBeenCalled();
    expect(redis.releaseLock).toHaveBeenCalledWith('post:views:buffer:lock', expect.any(String));
  });

  it('should return early when buffer is empty', async () => {
    redis.hgetall.mockResolvedValue({});
    await service.flushViewBuffer();

    expect(statsRepo.upsertStats).not.toHaveBeenCalled();
    expect(redis.del).toHaveBeenCalledWith(expect.stringContaining('post:views:buffer:flush:'));
  });

  it('should flush valid entries to DB', async () => {
    redis.hgetall.mockResolvedValue({
      '1': '10',
      '2': '5',
    });

    await service.flushViewBuffer();

    expect(statsRepo.upsertStats).toHaveBeenCalledTimes(2);
    expect(statsRepo.upsertStats).toHaveBeenCalledWith(1n, 10);
    expect(statsRepo.upsertStats).toHaveBeenCalledWith(2n, 5);
    expect(statsRepo.upsertDailyStats).toHaveBeenCalledTimes(2);
    expect(statsRepo.upsertDailyStats).toHaveBeenCalledWith(1n, expect.any(Date), 10);
    expect(statsRepo.upsertDailyStats).toHaveBeenCalledWith(2n, expect.any(Date), 5);
  });

  it('should skip entries with invalid post IDs', async () => {
    redis.hgetall.mockResolvedValue({
      'not-a-number': '10',
      '1': '5',
    });

    await service.flushViewBuffer();

    expect(statsRepo.upsertStats).toHaveBeenCalledTimes(1);
    expect(statsRepo.upsertStats).toHaveBeenCalledWith(1n, 5);
  });

  it('should skip entries with zero or negative counts', async () => {
    redis.hgetall.mockResolvedValue({
      '1': '0',
      '2': '-3',
      '3': 'abc',
      '4': '7',
    });

    await service.flushViewBuffer();

    expect(statsRepo.upsertStats).toHaveBeenCalledTimes(1);
    expect(statsRepo.upsertStats).toHaveBeenCalledWith(4n, 7);
  });

  it('should run the two upserts concurrently (not sequentially)', async () => {
    redis.hgetall.mockResolvedValue({ '1': '10' });

    // upsertStats hangs until we resolve it. If the two calls were sequential,
    // upsertDailyStats would NOT have been called while upsertStats is pending.
    let resolveStats!: () => void;
    statsRepo.upsertStats.mockImplementation(
      () => new Promise<void>((res) => { resolveStats = () => res(); }),
    );

    const flushPromise = service.flushViewBuffer();
    // Let all pending microtasks (lock, rename, hgetall, validation, the
    // Promise.all dispatch) settle so both upserts get a chance to run.
    await new Promise((res) => setImmediate(res));

    // Daily upsert was dispatched concurrently, before stats resolved.
    expect(statsRepo.upsertDailyStats).toHaveBeenCalledTimes(1);
    expect(statsRepo.upsertDailyStats).toHaveBeenCalledWith(1n, expect.any(Date), 10);

    resolveStats();
    await flushPromise;

    expect(statsRepo.upsertStats).toHaveBeenCalledWith(1n, 10);
    expect(redis.hincrby).not.toHaveBeenCalled();
  });

  it('should restore the count once if the daily upsert fails', async () => {
    redis.hgetall.mockResolvedValue({ '1': '10' });
    statsRepo.upsertStats.mockResolvedValue(undefined);
    statsRepo.upsertDailyStats.mockRejectedValue(new Error('daily DB down'));

    await service.flushViewBuffer();

    expect(redis.hincrby).toHaveBeenCalledTimes(1);
    expect(redis.hincrby).toHaveBeenCalledWith('post:views:buffer', '1', 10);
  });

  it('should restore counts to live buffer on DB failure', async () => {
    redis.hgetall.mockResolvedValue({ '1': '10' });
    statsRepo.upsertStats.mockRejectedValue(new Error('DB down'));

    await service.flushViewBuffer();

    expect(redis.hincrby).toHaveBeenCalledWith('post:views:buffer', '1', 10);
  });

  it('should always release lock even on unexpected error', async () => {
    redis.rename.mockResolvedValue(undefined);
    redis.hgetall.mockRejectedValue(new Error('unexpected'));

    await service.flushViewBuffer();

    expect(redis.releaseLock).toHaveBeenCalledWith('post:views:buffer:lock', expect.any(String));
  });

  it('should delete snapshot key after successful flush', async () => {
    redis.hgetall.mockResolvedValue({ '1': '5' });

    await service.flushViewBuffer();

    expect(redis.del).toHaveBeenCalledWith(expect.stringContaining('post:views:buffer:flush:'));
    expect(redis.releaseLock).toHaveBeenCalledWith('post:views:buffer:lock', expect.any(String));
  });

  it('should batch entries in groups of 20', async () => {
    const buffer: Record<string, string> = {};
    for (let i = 1; i <= 25; i++) {
      buffer[String(i)] = '1';
    }
    redis.hgetall.mockResolvedValue(buffer);

    await service.flushViewBuffer();

    expect(statsRepo.upsertStats).toHaveBeenCalledTimes(25);
    expect(statsRepo.upsertDailyStats).toHaveBeenCalledTimes(25);
  });
});
