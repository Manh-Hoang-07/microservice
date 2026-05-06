jest.mock('@package/common', () => ({
  createPaginationMeta: jest.fn().mockReturnValue({ page: 1, limit: 10, total: 0 }),
  parseQueryOptions: jest.fn().mockReturnValue({ page: 1, limit: 10 }),
}));
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));
jest.mock('src/types', () => ({ PrimaryKey: BigInt }), { virtual: true });
jest.mock('src/generated/prisma', () => ({ Prisma: {}, PrismaClient: class {} }), { virtual: true });
jest.mock('../../../../../src/modules/certificate/repositories/certificate.repository', () => ({
  CertificateRepository: jest.fn(),
}));

import { NotFoundException } from '@nestjs/common';
import { PublicCertificateService } from '../../../../../src/modules/certificate/public/services/certificate.service';

describe('PublicCertificateService', () => {
  let service: PublicCertificateService;
  let certificateRepo: Record<string, jest.Mock>;
  let redis: Record<string, jest.Mock>;

  const mockItem = { id: 1, name: 'ISO 9001', status: 'active' };

  beforeEach(() => {
    certificateRepo = {
      findMany: jest.fn().mockResolvedValue([mockItem]),
      count: jest.fn().mockResolvedValue(1),
      findActiveById: jest.fn().mockResolvedValue(mockItem),
    };

    redis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      del: jest.fn().mockResolvedValue(undefined),
    };

    service = new PublicCertificateService(certificateRepo as any, redis as any);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getList', () => {
    it('should return paginated list with active filter', async () => {
      const result = await service.getList({});
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(certificateRepo.findMany).toHaveBeenCalled();
    });

    it('should return cached data when available', async () => {
      const cached = JSON.stringify({ data: [mockItem], meta: { page: 1 } });
      redis.get.mockResolvedValue(cached);

      const result = await service.getList({});
      expect(result).toEqual(JSON.parse(cached));
      expect(certificateRepo.findMany).not.toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return item when found', async () => {
      const result = await service.getOne(1n);
      expect(result).toEqual(mockItem);
      expect(certificateRepo.findActiveById).toHaveBeenCalledWith(1n);
    });

    it('should throw NotFoundException when not found', async () => {
      certificateRepo.findActiveById.mockResolvedValue(null);
      await expect(service.getOne(1n)).rejects.toThrow(NotFoundException);
    });

    it('should return cached data when available', async () => {
      redis.get.mockResolvedValue(JSON.stringify(mockItem));
      const result = await service.getOne(1n);
      expect(result).toEqual(mockItem);
      expect(certificateRepo.findActiveById).not.toHaveBeenCalled();
    });
  });
});
