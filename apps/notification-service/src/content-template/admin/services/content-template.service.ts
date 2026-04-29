import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateContentTemplateDto } from '../dtos/create-content-template.dto';
import { UpdateContentTemplateDto } from '../dtos/update-content-template.dto';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class AdminContentTemplateService {
  constructor(private readonly prisma: PrismaService) {}

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
      this.prisma.contentTemplate.findMany({ where, orderBy: { created_at: 'desc' }, skip, take: limit }),
      this.prisma.contentTemplate.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const template = await this.prisma.contentTemplate.findUnique({ where: { id } });
    if (!template) throw new NotFoundException('Content template not found');
    return template;
  }

  async create(dto: CreateContentTemplateDto) {
    const existing = await this.prisma.contentTemplate.findUnique({ where: { code: dto.code } });
    if (existing) throw new BadRequestException('Template code already exists');
    return this.prisma.contentTemplate.create({ data: dto as any });
  }

  async update(id: bigint, dto: UpdateContentTemplateDto) {
    await this.getOne(id);
    if (dto.code) {
      const existing = await this.prisma.contentTemplate.findFirst({
        where: { code: dto.code, id: { not: id } },
      });
      if (existing) throw new BadRequestException('Template code already exists');
    }
    return this.prisma.contentTemplate.update({ where: { id }, data: dto as any });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.contentTemplate.delete({ where: { id } });
    return { success: true };
  }
}
