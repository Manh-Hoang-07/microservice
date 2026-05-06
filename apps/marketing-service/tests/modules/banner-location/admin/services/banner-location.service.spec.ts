// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('src/types', () => ({ toPrimaryKey: (v: any) => BigInt(v) }), { virtual: true });
jest.mock('src/generated/prisma', () => ({
  PrismaClient: class {},
  Prisma: {
    PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {
      code: string;
      constructor(message: string, opts: { code: string; clientVersion: string }) {
        super(message);
        this.code = opts.code;
      }
    },
  },
}), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('@package/common', () => ({
  parseQueryOptions: jest.fn().mockReturnValue({ page: 1, skip: 0, take: 10 }),
  createPaginationMeta: jest.fn().mockReturnValue({
    page: 1, limit: 10, total: 1, totalPages: 1,
    hasNextPage: false, hasPreviousPage: false,
  }),
}));
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { AdminBannerLocationService } from '../../../../../src/modules/banner-location/admin/services/banner-location.service';
import { BannerLocationRepository } from '../../../../../src/modules/banner-location/repositories/banner-location.repository';
import { RedisService } from '@package/redis';

describe('AdminBannerLocationService', () => {
  let service: AdminBannerLocationService;
  let locationRepo: jest.Mocked<Partial<BannerLocationRepository>>;
  let redis: jest.Mocked<Partial<RedisService>>;

  const mockLocation = {
    id: 1n,
    code: 'HERO',
    name: 'Hero Section',
    description: 'Main hero banner',
    status: 'active',
  };

  beforeEach(() => {
    locationRepo = {
      findMany: jest.fn(),
      count: jest.fn(),
      findById: jest.fn(),
      findByCode: jest.fn(),
      findCodeConflict: jest.fn(),
      countBanners: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    redis = {
      del: jest.fn().mockResolvedValue(undefined),
    };

    service = new AdminBannerLocationService(locationRepo as any, redis as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getList', () => {
    it('should return paginated location list', async () => {
      locationRepo.findMany!.mockResolvedValue([mockLocation] as any);
      locationRepo.count!.mockResolvedValue(1);

      const result = await service.getList({ page: 1, limit: 10 });

      expect(locationRepo.findMany).toHaveBeenCalled();
      expect(locationRepo.count).toHaveBeenCalled();
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
    });

    it('should apply search and status filters', async () => {
      locationRepo.findMany!.mockResolvedValue([]);
      locationRepo.count!.mockResolvedValue(0);

      await service.getList({ search: 'hero', status: 'active' });

      expect(locationRepo.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'hero', status: 'active' }),
        expect.any(Object),
      );
    });

    it('should skip count when skipCount is true', async () => {
      locationRepo.findMany!.mockResolvedValue([]);

      await service.getList({ skipCount: true });

      expect(locationRepo.count).not.toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return location by id', async () => {
      locationRepo.findById!.mockResolvedValue(mockLocation as any);

      const result = await service.getOne(1n);

      expect(locationRepo.findById).toHaveBeenCalledWith(1n);
      expect(result).toEqual(mockLocation);
    });

    it('should throw NotFoundException when location not found', async () => {
      locationRepo.findById!.mockResolvedValue(null);

      await expect(service.getOne(1n)).rejects.toThrow(NotFoundException);
      await expect(service.getOne(1n)).rejects.toThrow('Banner location not found');
    });
  });

  describe('create', () => {
    const createDto = {
      code: 'SIDEBAR',
      name: 'Sidebar',
      description: 'Sidebar banner',
      status: 'active',
    };

    it('should create location when code is unique', async () => {
      locationRepo.findByCode!.mockResolvedValue(null);
      locationRepo.create!.mockResolvedValue({ ...mockLocation, id: 2n, code: 'SIDEBAR' } as any);

      const result = await service.create(createDto as any);

      expect(locationRepo.findByCode).toHaveBeenCalledWith('SIDEBAR');
      expect(locationRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ code: 'SIDEBAR', name: 'Sidebar' }),
      );
      expect(redis.del).toHaveBeenCalledWith('marketing:public:banners:list');
      expect(result).toEqual(expect.objectContaining({ code: 'SIDEBAR' }));
    });

    it('should throw ConflictException when code already exists', async () => {
      locationRepo.findByCode!.mockResolvedValue(mockLocation as any);

      await expect(service.create(createDto as any)).rejects.toThrow(ConflictException);
      await expect(service.create(createDto as any)).rejects.toThrow(
        'Banner location code already exists',
      );
    });

    it('should default status to "active" when not provided', async () => {
      locationRepo.findByCode!.mockResolvedValue(null);
      locationRepo.create!.mockResolvedValue(mockLocation as any);

      const dtoNoStatus = { code: 'TEST', name: 'Test' };
      await service.create(dtoNoStatus as any);

      expect(locationRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'active' }),
      );
    });

    it('should map P2002 error to ConflictException on concurrent race', async () => {
      locationRepo.findByCode!.mockResolvedValue(null);
      locationRepo.create!.mockRejectedValue(
        new (Prisma.PrismaClientKnownRequestError as any)('Unique constraint', {
          code: 'P2002',
          clientVersion: '5.0.0',
        }),
      );

      await expect(service.create(createDto as any)).rejects.toThrow(ConflictException);
    });

    it('should rethrow non-P2002 errors', async () => {
      locationRepo.findByCode!.mockResolvedValue(null);
      locationRepo.create!.mockRejectedValue(new Error('DB connection lost'));

      await expect(service.create(createDto as any)).rejects.toThrow('DB connection lost');
    });
  });

  describe('update', () => {
    const updateDto = { name: 'Updated Location' };

    it('should verify location exists and update', async () => {
      locationRepo.findById!.mockResolvedValue(mockLocation as any);
      locationRepo.update!.mockResolvedValue({ ...mockLocation, name: 'Updated Location' } as any);

      const result = await service.update(1n, updateDto as any);

      expect(locationRepo.findById).toHaveBeenCalledWith(1n);
      expect(locationRepo.update).toHaveBeenCalledWith(1n, updateDto);
      expect(redis.del).toHaveBeenCalledWith('marketing:public:banners:list');
      expect(result).toEqual(expect.objectContaining({ name: 'Updated Location' }));
    });

    it('should check code conflict when code is updated', async () => {
      locationRepo.findById!.mockResolvedValue(mockLocation as any);
      locationRepo.findCodeConflict!.mockResolvedValue(null);
      locationRepo.update!.mockResolvedValue({ ...mockLocation, code: 'NEW_CODE' } as any);

      await service.update(1n, { code: 'NEW_CODE' } as any);

      expect(locationRepo.findCodeConflict).toHaveBeenCalledWith('NEW_CODE', 1n);
    });

    it('should throw ConflictException when code conflicts with another location', async () => {
      locationRepo.findById!.mockResolvedValue(mockLocation as any);
      locationRepo.findCodeConflict!.mockResolvedValue({ id: 2n } as any);

      await expect(
        service.update(1n, { code: 'HERO' } as any),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException when location does not exist', async () => {
      locationRepo.findById!.mockResolvedValue(null);

      await expect(service.update(1n, updateDto as any)).rejects.toThrow(NotFoundException);
    });

    it('should map P2002 error on update to ConflictException', async () => {
      locationRepo.findById!.mockResolvedValue(mockLocation as any);
      locationRepo.update!.mockRejectedValue(
        new (Prisma.PrismaClientKnownRequestError as any)('Unique constraint', {
          code: 'P2002',
          clientVersion: '5.0.0',
        }),
      );

      await expect(service.update(1n, updateDto as any)).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('should delete location when it has no banners', async () => {
      locationRepo.findById!.mockResolvedValue(mockLocation as any);
      locationRepo.countBanners!.mockResolvedValue(0);
      locationRepo.delete!.mockResolvedValue(undefined as any);

      const result = await service.delete(1n);

      expect(locationRepo.findById).toHaveBeenCalledWith(1n);
      expect(locationRepo.countBanners).toHaveBeenCalledWith(1n);
      expect(locationRepo.delete).toHaveBeenCalledWith(1n);
      expect(redis.del).toHaveBeenCalledWith('marketing:public:banners:list');
      expect(result).toEqual({ success: true });
    });

    it('should throw ConflictException when location has banners', async () => {
      locationRepo.findById!.mockResolvedValue(mockLocation as any);
      locationRepo.countBanners!.mockResolvedValue(3);

      await expect(service.delete(1n)).rejects.toThrow(ConflictException);
      await expect(service.delete(1n)).rejects.toThrow(
        'Banner location has banners and cannot be deleted',
      );
    });

    it('should throw NotFoundException when location does not exist', async () => {
      locationRepo.findById!.mockResolvedValue(null);

      await expect(service.delete(1n)).rejects.toThrow(NotFoundException);
    });
  });

  describe('changeStatus', () => {
    it('should update the status and clear cache', async () => {
      locationRepo.findById!.mockResolvedValue(mockLocation as any);
      locationRepo.update!.mockResolvedValue({ ...mockLocation, status: 'inactive' } as any);

      const result = await service.changeStatus(1n, { status: 'inactive' } as any);

      expect(locationRepo.findById).toHaveBeenCalledWith(1n);
      expect(locationRepo.update).toHaveBeenCalledWith(1n, { status: 'inactive' });
      expect(redis.del).toHaveBeenCalledWith('marketing:public:banners:list');
      expect(result).toEqual(expect.objectContaining({ status: 'inactive' }));
    });

    it('should throw NotFoundException when location does not exist', async () => {
      locationRepo.findById!.mockResolvedValue(null);

      await expect(
        service.changeStatus(1n, { status: 'inactive' } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
