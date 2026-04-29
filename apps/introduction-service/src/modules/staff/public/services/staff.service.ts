import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { ACTIVE_STATUS } from '../../../../common/enums';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class PublicStaffService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: ACTIVE_STATUS };
    if (query.department) where.department = query.department;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { position: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.staff.findMany({
        where,
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.staff.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.prisma.staff.findFirst({
      where: { id, status: ACTIVE_STATUS },
    });
    if (!item) throw new NotFoundException('Staff not found');
    return item;
  }
}
