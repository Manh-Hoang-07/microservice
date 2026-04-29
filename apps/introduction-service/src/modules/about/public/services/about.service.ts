import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { ACTIVE_STATUS } from '../../../../common/enums';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class PublicAboutService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: ACTIVE_STATUS };
    if (query.section_type) where.section_type = query.section_type;
    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.aboutSection.findMany({
        where,
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.aboutSection.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.prisma.aboutSection.findFirst({
      where: { slug, status: ACTIVE_STATUS },
    });
    if (!item) throw new NotFoundException('About section not found');
    return item;
  }
}
