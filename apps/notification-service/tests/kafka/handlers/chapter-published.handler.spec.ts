jest.mock('src/generated/prisma', () => ({ PrismaClient: class {}, Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
  createPaginationMeta: jest.fn(),
  parseQueryOptions: jest.fn(),
}));
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));
jest.mock('nestjs-i18n', () => ({ I18nService: jest.fn() }));
jest.mock('src/types', () => ({ PrimaryKey: BigInt }), { virtual: true });

import { ChapterPublishedHandler } from '../../../src/event/kafka/handlers/chapter-published.handler';

describe('ChapterPublishedHandler', () => {
  let handler: ChapterPublishedHandler;
  let followersProjectionRepo: { findByComicId: jest.Mock };
  let notifService: { createMany: jest.Mock };

  beforeEach(() => {
    followersProjectionRepo = {
      findByComicId: jest.fn().mockResolvedValue([]),
    };
    notifService = {
      createMany: jest.fn().mockResolvedValue({ count: 0 }),
    };
    handler = new ChapterPublishedHandler(
      followersProjectionRepo as any,
      notifService as any,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should skip when payload is null/undefined', async () => {
    await handler.handle(null);
    await handler.handle(undefined);
    expect(followersProjectionRepo.findByComicId).not.toHaveBeenCalled();
  });

  it('should skip when comic_id is missing', async () => {
    await handler.handle({ comic_title: 'Title', chapter_label: 'Ch 1' });
    expect(followersProjectionRepo.findByComicId).not.toHaveBeenCalled();
  });

  it('should skip when comic_id is not numeric', async () => {
    await handler.handle({ comic_id: 'abc', comic_title: 'T', chapter_label: 'Ch1' });
    expect(followersProjectionRepo.findByComicId).not.toHaveBeenCalled();
  });

  it('should skip when comic_title is not a string', async () => {
    await handler.handle({ comic_id: '1', comic_title: 123, chapter_label: 'Ch1' });
    expect(followersProjectionRepo.findByComicId).not.toHaveBeenCalled();
  });

  it('should skip when chapter_label is not a string', async () => {
    await handler.handle({ comic_id: '1', comic_title: 'T', chapter_label: null });
    expect(followersProjectionRepo.findByComicId).not.toHaveBeenCalled();
  });

  it('should skip when no followers found', async () => {
    followersProjectionRepo.findByComicId.mockResolvedValue([]);
    await handler.handle({ comic_id: '1', comic_title: 'T', chapter_label: 'Ch1' });

    expect(followersProjectionRepo.findByComicId).toHaveBeenCalledWith(1n);
    expect(notifService.createMany).not.toHaveBeenCalled();
  });

  it('should create notifications for all followers', async () => {
    followersProjectionRepo.findByComicId.mockResolvedValue([
      { userId: 10n },
      { userId: 20n },
    ]);

    await handler.handle({
      comic_id: '5',
      comic_title: 'My Comic',
      comic_slug: 'my-comic',
      chapter_label: 'Chapter 3',
    });

    expect(notifService.createMany).toHaveBeenCalledWith([
      expect.objectContaining({
        userId: 10n,
        title: 'My Comic - Chapter 3',
        type: 'info',
        data: { comic_id: '5', comic_slug: 'my-comic', chapter_label: 'Chapter 3' },
      }),
      expect.objectContaining({
        userId: 20n,
        title: 'My Comic - Chapter 3',
        type: 'info',
      }),
    ]);
  });

  it('should throw when a batch fails', async () => {
    followersProjectionRepo.findByComicId.mockResolvedValue([{ userId: 1n }]);
    notifService.createMany.mockRejectedValue(new Error('DB error'));

    await expect(
      handler.handle({ comic_id: '1', comic_title: 'T', chapter_label: 'Ch1' }),
    ).rejects.toThrow('1 batch(es) failed');
  });

  it('should split followers into 500-sized batches and cover every follower', async () => {
    // 1100 followers → 3 batches (500, 500, 100)
    const followers = Array.from({ length: 1100 }, (_, i) => ({ userId: BigInt(i + 1) }));
    followersProjectionRepo.findByComicId.mockResolvedValue(followers);

    await handler.handle({ comic_id: '7', comic_title: 'C', chapter_label: 'Ch1' });

    expect(notifService.createMany).toHaveBeenCalledTimes(3);
    const sizes = notifService.createMany.mock.calls.map((c) => c[0].length);
    expect(sizes).toEqual([500, 500, 100]);
    // Every follower id appears exactly once across all batches.
    const allIds = notifService.createMany.mock.calls.flatMap((c) => c[0].map((n: any) => n.userId));
    expect(allIds).toHaveLength(1100);
    expect(new Set(allIds).size).toBe(1100);
  });

  it('should run batches with bounded concurrency (max 4 in flight)', async () => {
    // 10 batches worth of followers (5000 → 10 batches).
    const followers = Array.from({ length: 5000 }, (_, i) => ({ userId: BigInt(i + 1) }));
    followersProjectionRepo.findByComicId.mockResolvedValue(followers);

    let inFlight = 0;
    let maxInFlight = 0;
    notifService.createMany.mockImplementation(async () => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((r) => setTimeout(r, 5));
      inFlight--;
      return { count: 500 };
    });

    await handler.handle({ comic_id: '9', comic_title: 'C', chapter_label: 'Ch1' });

    expect(notifService.createMany).toHaveBeenCalledTimes(10);
    expect(maxInFlight).toBeGreaterThan(1); // actually parallel
    expect(maxInFlight).toBeLessThanOrEqual(4); // but bounded
  });

  it('should process all batches even if some fail, then throw with failure count', async () => {
    const followers = Array.from({ length: 1500 }, (_, i) => ({ userId: BigInt(i + 1) }));
    followersProjectionRepo.findByComicId.mockResolvedValue(followers);

    let call = 0;
    notifService.createMany.mockImplementation(async () => {
      call++;
      if (call === 2) throw new Error('DB error');
      return { count: 500 };
    });

    await expect(
      handler.handle({ comic_id: '3', comic_title: 'C', chapter_label: 'Ch1' }),
    ).rejects.toThrow('1 batch(es) failed');
    // All 3 batches attempted despite the failure.
    expect(notifService.createMany).toHaveBeenCalledTimes(3);
  });
});
