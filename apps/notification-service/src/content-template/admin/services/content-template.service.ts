import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateContentTemplateDto } from '../dtos/create-content-template.dto';
import { UpdateContentTemplateDto } from '../dtos/update-content-template.dto';
import { createPaginationMeta } from '@package/common';
import { ContentTemplateRepository } from '../../repositories/content-template.repository';

@Injectable()
export class AdminContentTemplateService {
  constructor(private readonly templateRepo: ContentTemplateRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.type) where.type = query.type;
    if (query.category) where.category = query.category;
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { code: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.templateRepo.findMany(where, { skip, take: limit }),
      this.templateRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const template = await this.templateRepo.findById(id);
    if (!template) throw new NotFoundException('Content template not found');
    return template;
  }

  async create(dto: CreateContentTemplateDto) {
    const existing = await this.templateRepo.findByCode(dto.code);
    if (existing) throw new BadRequestException('Template code already exists');
    return this.templateRepo.create(dto as any);
  }

  async update(id: bigint, dto: UpdateContentTemplateDto) {
    await this.getOne(id);
    if (dto.code) {
      const existing = await this.templateRepo.findFirst({ code: dto.code, id: { not: id } });
      if (existing) throw new BadRequestException('Template code already exists');
    }
    return this.templateRepo.update(id, dto as any);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.templateRepo.delete(id);
    return { success: true };
  }
}
