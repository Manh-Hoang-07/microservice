jest.mock('@package/common', () => ({
  createPaginationMeta: jest.fn().mockReturnValue({ page: 1, limit: 10, total: 0 }),
  parseQueryOptions: jest.fn().mockReturnValue({ page: 1, limit: 10 }),
  SlugHelper: { uniqueSlug: jest.fn().mockResolvedValue('test-slug') },
}));
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));
jest.mock('src/types', () => ({ PrimaryKey: BigInt }), { virtual: true });
jest.mock('src/generated/prisma', () => ({
  Prisma: { PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error { code: string; constructor(msg: string, meta: any) { super(msg); this.code = meta.code; } } },
  PrismaClient: class {},
}), { virtual: true });
jest.mock('../../../../../src/modules/gallery/repositories/gallery.repository', () => ({
  GalleryRepository: jest.fn(),
}));

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SlugHelper } from '@package/common';
import { AdminGalleryService } from '../../../../../src/modules/gallery/admin/services/gallery.service';

describe('AdminGalleryService', () => {
  let service: AdminGalleryService;
  let galleryRepo: Record<string, jest.Mock>;
  let redis: Record<string, jest.Mock>;

  const mockItem = { id: 1n, title: 'Gallery 1', slug: 'gallery-1', status: 'active', images: [] };

  beforeEach(() => {
    galleryRepo = {
      findMany: jest.fn().mockResolvedValue([mockItem]),
      count: jest.fn().mockResolvedValue(1),
      findById: jest.fn().mockResolvedValue(mockItem),
      findBySlug: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(mockItem),
      update: jest.fn().mockResolvedValue(mockItem),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    redis = {
      del: jest.fn().mockResolvedValue(undefined),
    };

    service = new AdminGalleryService(galleryRepo as any, redis as any);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getList', () => {
    it('should return paginated list', async () => {
      const result = await service.getList({});
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(galleryRepo.findMany).toHaveBeenCalled();
      expect(galleryRepo.count).toHaveBeenCalled();
    });

    it('should skip count when skipCount is true', async () => {
      await service.getList({ skipCount: true });
      expect(galleryRepo.count).not.toHaveBeenCalled();
    });

    it('should skip count when skipCount is string "true"', async () => {
      await service.getList({ skipCount: 'true' });
      expect(galleryRepo.count).not.toHaveBeenCalled();
    });

    it('should pass search, status, and featured filters', async () => {
      await service.getList({ search: 'test', status: 'active', featured: 'true' });
      expect(galleryRepo.findMany).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return item when found', async () => {
      const result = await service.getOne(1n);
      expect(result).toEqual(mockItem);
      expect(galleryRepo.findById).toHaveBeenCalledWith(1n);
    });

    it('should throw NotFoundException when not found', async () => {
      galleryRepo.findById.mockResolvedValue(null);
      await expect(service.getOne(1n)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create with slug and clear cache', async () => {
      const dto = { title: 'New Gallery' };
      (SlugHelper.uniqueSlug as jest.Mock).mockResolvedValue('new-gallery');

      const result = await service.create(dto as any);
      expect(result).toEqual(mockItem);
      expect(galleryRepo.create).toHaveBeenCalled();
      expect(redis.del).toHaveBeenCalled();
    });

    it('should throw BadRequestException on duplicate slug (P2002)', async () => {
      const { Prisma } = require('src/generated/prisma');
      const p2002 = new Prisma.PrismaClientKnownRequestError('dup', { code: 'P2002' });
      galleryRepo.create.mockRejectedValue(p2002);
      (SlugHelper.uniqueSlug as jest.Mock).mockResolvedValue('dup-slug');

      await expect(service.create({ title: 'Test' } as any)).rejects.toThrow(BadRequestException);
    });

    it('should re-throw non-P2002 errors', async () => {
      galleryRepo.create.mockRejectedValue(new Error('DB down'));
      (SlugHelper.uniqueSlug as jest.Mock).mockResolvedValue('slug');

      await expect(service.create({ title: 'Test' } as any)).rejects.toThrow('DB down');
    });
  });

  describe('update', () => {
    it('should update and clear cache', async () => {
      (SlugHelper.uniqueSlug as jest.Mock).mockResolvedValue('updated-slug');
      const result = await service.update(1n, { title: 'Updated' } as any);
      expect(result).toEqual(mockItem);
      expect(galleryRepo.update).toHaveBeenCalled();
      expect(redis.del).toHaveBeenCalled();
    });

    it('should throw NotFoundException when item not found', async () => {
      galleryRepo.findById.mockResolvedValue(null);
      await expect(service.update(1n, { title: 'X' } as any)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException on duplicate slug (P2002)', async () => {
      const { Prisma } = require('src/generated/prisma');
      const p2002 = new Prisma.PrismaClientKnownRequestError('dup', { code: 'P2002' });
      galleryRepo.update.mockRejectedValue(p2002);
      (SlugHelper.uniqueSlug as jest.Mock).mockResolvedValue('dup-slug');

      await expect(service.update(1n, { slug: 'dup-slug' } as any)).rejects.toThrow(BadRequestException);
    });

    it('should not regenerate slug when title unchanged', async () => {
      const result = await service.update(1n, { status: 'inactive' } as any);
      expect(result).toEqual(mockItem);
      expect(SlugHelper.uniqueSlug).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete and clear cache', async () => {
      const result = await service.delete(1n);
      expect(result).toEqual({ success: true });
      expect(galleryRepo.delete).toHaveBeenCalledWith(1n);
      expect(redis.del).toHaveBeenCalled();
    });

    it('should throw NotFoundException when item not found', async () => {
      galleryRepo.findById.mockResolvedValue(null);
      await expect(service.delete(1n)).rejects.toThrow(NotFoundException);
    });
  });
});
