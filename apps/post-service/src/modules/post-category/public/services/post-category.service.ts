import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';

@Injectable()
export class PublicPostCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const data = await this.prisma.postCategory.findMany({
      where: { is_active: true, parent_id: null },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        parent_id: true,
        sort_order: true,
        seo_title: true,
        seo_description: true,
        seo_keywords: true,
        children: {
          where: { is_active: true },
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            sort_order: true,
            seo_title: true,
            seo_description: true,
            seo_keywords: true,
          },
          orderBy: { sort_order: 'asc' },
        },
      },
      orderBy: { sort_order: 'asc' },
    });
    return { data };
  }
}
