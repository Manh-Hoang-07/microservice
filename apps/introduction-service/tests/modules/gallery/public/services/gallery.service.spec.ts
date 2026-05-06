jest.mock('@package/common', () => ({
  createPaginationMeta: jest.fn().mockReturnValue({ page: 1, limit: 10, total: 0 }),
  parseQueryOptions: jest.fn().mockReturnValue({ page: 1, limit: 10 }),
}));
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));
jest.mock('src/types', () => ({ PrimaryKey: BigInt }), { virtual: true });
jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });
jest.mock('../../../../../src/modules/gallery/repositories/gallery.repository', () => ({
  GalleryRepository: jest.fn(),
}));

import { NotFoundException } from '@nestjs/common';
import { PublicGalleryService } from '../../../../../src/modules/gallery/public/services/gallery.service';

describe('PublicGalleryService', () => {
  let service: PublicGalleryService;
  let galleryRepo: Record<string, jest.Mock>;
  let redis: Record<string, jest.Mock>;

  const mockItem = { id: 1, title: 'Gallery 1', slug: 'gallery-1', status: 'active' };

  beforeEach(() => {
    galleryRepo = {
      findMany: jest.fn().mockResolvedValue([mockItem]),
      count: jest.fn().mockResolvedValue(1),
      findActiveBySlug: jest.fn().mockResolvedValue(mockItem),
    };

    redis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      del: jest.fn().mockResolvedValue(undefined),
    };

    service = new PublicGalleryService(galleryRepo as any, redis as any);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getList', () => {
    it('should return paginated list with active filter', async () => {
      const result = await service.getList({});
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(galleryRepo.findMany).toHaveBeenCalled();
    });

    it('should return cached data when available', async () => {
      const cached = JSON.stringify({ data: [mockItem], meta: { page: 1 } });
      redis.get.mockResolvedValue(cached);

      const result = await service.getList({});
      expect(result).toEqual(JSON.parse(cached));
      expect(galleryRepo.findMany).not.toHaveBeenCalled();
    });
  });

  describe('getBySlug', () => {
    it('should return item when found', async () => {
      const result = await service.getBySlug('gallery-1');
      expect(result).toEqual(mockItem);
      expect(galleryRepo.findActiveBySlug).toHaveBeenCalledWith('gallery-1');
    });

    it('should throw NotFoundException when not found', async () => {
      galleryRepo.findActiveBySlug.mockResolvedValue(null);
      await expect(service.getBySlug('nonexistent')).rejects.toThrow(NotFoundException);
    });

    it('should return cached data when available', async () => {
      redis.get.mockResolvedValue(JSON.stringify(mockItem));
      const result = await service.getBySlug('gallery-1');
      expect(result).toEqual(mockItem);
      expect(galleryRepo.findActiveBySlug).not.toHaveBeenCalled();
    });
  });
});
