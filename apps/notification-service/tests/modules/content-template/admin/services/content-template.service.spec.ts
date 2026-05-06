// Module mocks - must come before any import
jest.mock('src/generated/prisma', () => ({ PrismaClient: class {}, Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
  createPaginationMeta: jest.fn().mockReturnValue({ page: 1, limit: 10, total: 0 }),
  parseQueryOptions: jest.fn().mockReturnValue({ skip: 0, take: 10 }),
}));
jest.mock('nestjs-i18n', () => ({ I18nService: jest.fn() }));
jest.mock('src/types', () => ({ PrimaryKey: BigInt }), { virtual: true });

import { NotFoundException, BadRequestException } from '@nestjs/common';
import { AdminContentTemplateService } from '../../../../../src/modules/content-template/admin/services/content-template.service';
import { ContentTemplateRepository } from '../../../../../src/modules/content-template/repositories/content-template.repository';

describe('AdminContentTemplateService', () => {
  let service: AdminContentTemplateService;
  let templateRepo: jest.Mocked<Partial<ContentTemplateRepository>>;
  let i18n: any;

  const mockTemplate = {
    id: 1n,
    code: 'welcome_email',
    name: 'Welcome Email',
    content: '<h1>Hello {{name}}</h1>',
    type: 'email',
    category: 'render',
    status: 'active',
  };

  beforeEach(() => {
    templateRepo = {
      findMany: jest.fn().mockResolvedValue([mockTemplate]),
      count: jest.fn().mockResolvedValue(1),
      findById: jest.fn(),
      findByCode: jest.fn(),
      findFirst: jest.fn(),
      findActiveByCode: jest.fn(),
      create: jest.fn().mockResolvedValue(mockTemplate),
      update: jest.fn().mockResolvedValue(mockTemplate),
      delete: jest.fn(),
    };

    i18n = {};

    service = new AdminContentTemplateService(
      templateRepo as any,
      i18n,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getList', () => {
    it('should return paginated list', async () => {
      const query = {} as any;
      const result = await service.getList(query);

      expect(templateRepo.findMany).toHaveBeenCalled();
      expect(templateRepo.count).toHaveBeenCalled();
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
    });

    it('should apply search filter', async () => {
      const query = { search: 'welcome' } as any;
      await service.getList(query);

      expect(templateRepo.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'welcome' }),
        expect.any(Object),
      );
    });

    it('should apply type, category, and status filters', async () => {
      const query = { type: 'email', category: 'render', status: 'active' } as any;
      await service.getList(query);

      expect(templateRepo.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'email', category: 'render', status: 'active' }),
        expect.any(Object),
      );
    });

    it('should skip count when skipCount is "true"', async () => {
      const query = { skipCount: 'true' } as any;
      await service.getList(query);

      expect(templateRepo.count).not.toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return template when found', async () => {
      templateRepo.findById!.mockResolvedValue(mockTemplate);

      const result = await service.getOne(1n);

      expect(templateRepo.findById).toHaveBeenCalledWith(1n);
      expect(result).toEqual(mockTemplate);
    });

    it('should throw NotFoundException when not found', async () => {
      templateRepo.findById!.mockResolvedValue(null);

      await expect(service.getOne(1n)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create template when code is unique', async () => {
      templateRepo.findByCode!.mockResolvedValue(null);

      const dto = { code: 'new_template', name: 'New', content: 'Body' };
      const result = await service.create(dto as any);

      expect(templateRepo.findByCode).toHaveBeenCalledWith('new_template');
      expect(templateRepo.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockTemplate);
    });

    it('should throw BadRequestException when code already exists', async () => {
      templateRepo.findByCode!.mockResolvedValue(mockTemplate);

      const dto = { code: 'welcome_email', name: 'Dup', content: 'Body' };

      await expect(service.create(dto as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update template when exists and code is unique', async () => {
      templateRepo.findById!.mockResolvedValue(mockTemplate);
      templateRepo.findFirst!.mockResolvedValue(null);

      const dto = { code: 'updated_code', name: 'Updated' };
      const result = await service.update(1n, dto as any);

      expect(templateRepo.findFirst).toHaveBeenCalledWith({ code: 'updated_code', id: { not: 1n } });
      expect(templateRepo.update).toHaveBeenCalledWith(1n, dto);
      expect(result).toEqual(mockTemplate);
    });

    it('should skip code uniqueness check when code is not in dto', async () => {
      templateRepo.findById!.mockResolvedValue(mockTemplate);

      const dto = { name: 'Updated Name Only' };
      await service.update(1n, dto as any);

      expect(templateRepo.findFirst).not.toHaveBeenCalled();
      expect(templateRepo.update).toHaveBeenCalledWith(1n, dto);
    });

    it('should throw BadRequestException when code conflicts with another template', async () => {
      templateRepo.findById!.mockResolvedValue(mockTemplate);
      templateRepo.findFirst!.mockResolvedValue({ ...mockTemplate, id: 2n });

      const dto = { code: 'existing_code' };

      await expect(service.update(1n, dto as any)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when template not found', async () => {
      templateRepo.findById!.mockResolvedValue(null);

      await expect(service.update(1n, { name: 'X' } as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete existing template', async () => {
      templateRepo.findById!.mockResolvedValue(mockTemplate);

      const result = await service.delete(1n);

      expect(templateRepo.findById).toHaveBeenCalledWith(1n);
      expect(templateRepo.delete).toHaveBeenCalledWith(1n);
      expect(result).toBe(true);
    });

    it('should throw NotFoundException when template not found', async () => {
      templateRepo.findById!.mockResolvedValue(null);

      await expect(service.delete(1n)).rejects.toThrow(NotFoundException);
    });
  });
});
