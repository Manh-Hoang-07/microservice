import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta } from '../../../../common/pagination.helper';

const PUBLIC_PROJECT_STATUSES = ['planning', 'in_progress', 'completed'];

@Injectable()
export class PublicProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: { in: PUBLIC_PROJECT_STATUSES } };
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        include: {
          testimonials: {
            where: { status: 'active' },
            orderBy: { sort_order: 'asc' },
          },
        },
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.project.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.prisma.project.findFirst({
      where: { slug, status: { in: PUBLIC_PROJECT_STATUSES } },
      include: {
        testimonials: {
          where: { status: 'active' },
          orderBy: { sort_order: 'asc' },
        },
      },
    });
    if (!item) throw new NotFoundException('Project not found');

    // Increment view_count
    await this.prisma.project.update({
      where: { id: item.id },
      data: { view_count: { increment: 1 } },
    });

    return { ...item, view_count: item.view_count + 1 };
  }
}
