jest.mock('@package/common', () => ({
  createPaginationMeta: jest.fn().mockReturnValue({ page: 1, limit: 10, total: 0 }),
  parseQueryOptions: jest.fn().mockReturnValue({ page: 1, limit: 10 }),
}));
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));
jest.mock('src/types', () => ({ PrimaryKey: BigInt }), { virtual: true });
jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });
jest.mock('../../../../../src/modules/about/repositories/about-section.repository', () => ({
  AboutSectionRepository: jest.fn(),
}));

import { NotFoundException } from '@nestjs/common';
import { PublicAboutService } from '../../../../../src/modules/about/public/services/about.service';

describe('PublicAboutService', () => {
  let service: PublicAboutService;
  let aboutRepo: Record<string, jest.Mock>;
  let redis: Record<string, jest.Mock>;

  const mockItem = { id: 1, title: 'About Us', slug: 'about-us', status: 'active' };

  beforeEach(() => {
    aboutRepo = {
      findMany: jest.fn().mockResolvedValue([mockItem]),
      count: jest.fn().mockResolvedValue(1),
      findActiveBySlug: jest.fn().mockResolvedValue(mockItem),
    };

    redis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      del: jest.fn().mockResolvedValue(undefined),
    };

    service = new PublicAboutService(aboutRepo as any, redis as any);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getList', () => {
    it('should return paginated list with active filter', async () => {
      const result = await service.getList({});
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(aboutRepo.findMany).toHaveBeenCalled();
      expect(aboutRepo.count).toHaveBeenCalled();
    });

    it('should return cached data when available', async () => {
      const cached = JSON.stringify({ data: [mockItem], meta: { page: 1 } });
      redis.get.mockResolvedValue(cached);

      const result = await service.getList({});
      expect(result).toEqual(JSON.parse(cached));
      expect(aboutRepo.findMany).not.toHaveBeenCalled();
    });
  });

  describe('getBySlug', () => {
    it('should return item when found', async () => {
      const result = await service.getBySlug('about-us');
      expect(result).toEqual(mockItem);
      expect(aboutRepo.findActiveBySlug).toHaveBeenCalledWith('about-us');
    });

    it('should throw NotFoundException when not found', async () => {
      aboutRepo.findActiveBySlug.mockResolvedValue(null);
      await expect(service.getBySlug('nonexistent')).rejects.toThrow(NotFoundException);
    });

    it('should return cached data when available', async () => {
      redis.get.mockResolvedValue(JSON.stringify(mockItem));
      const result = await service.getBySlug('about-us');
      expect(result).toEqual(mockItem);
      expect(aboutRepo.findActiveBySlug).not.toHaveBeenCalled();
    });
  });
});
