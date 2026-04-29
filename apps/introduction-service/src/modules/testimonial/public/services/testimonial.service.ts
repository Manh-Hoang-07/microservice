import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { ACTIVE_STATUS } from '../../../../common/enums';
import { createPaginationMeta, toPrimaryKey } from '../../../../common/pagination.helper';

@Injectable()
export class PublicTestimonialService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: ACTIVE_STATUS };
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }
    if (query.project_id) where.project_id = toPrimaryKey(query.project_id);
    if (query.search) {
      where.OR = [
        { client_name: { contains: query.search } },
        { client_company: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.testimonial.findMany({
        where,
        include: { project: { select: { id: true, name: true, slug: true } } },
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.testimonial.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.prisma.testimonial.findFirst({
      where: { id, status: ACTIVE_STATUS },
      include: { project: { select: { id: true, name: true, slug: true } } },
    });
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }
}
