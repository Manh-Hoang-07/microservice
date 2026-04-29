import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreatePartnerDto } from '../dtos/create-partner.dto';
import { UpdatePartnerDto } from '../dtos/update-partner.dto';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class AdminPartnerService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.type) where.type = query.type;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.partner.findMany({
        where,
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.partner.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.prisma.partner.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Partner not found');
    return item;
  }

  async create(dto: CreatePartnerDto) {
    return this.prisma.partner.create({
      data: {
        name: dto.name,
        logo: dto.logo,
        website: dto.website,
        description: dto.description,
        type: dto.type,
        status: dto.status || 'active',
        sort_order: dto.sort_order ?? 0,
      },
    });
  }

  async update(id: bigint, dto: UpdatePartnerDto) {
    await this.getOne(id);
    return this.prisma.partner.update({ where: { id }, data: dto as any });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.partner.delete({ where: { id } });
    return { success: true };
  }
}
