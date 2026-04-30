import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PostCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.PostCategoryWhereInput, options: { skip: number; take: number }) {
    return this.prisma.postCategory.findMany({
      where,
      include: { children: { orderBy: { sort_order: 'asc' } } },
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.PostCategoryWhereInput) {
    return this.prisma.postCategory.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.postCategory.findUnique({
      where: { id },
      include: { children: { orderBy: { sort_order: 'asc' } } },
    });
  }

  findFirst(where: Prisma.PostCategoryWhereInput) {
    return this.prisma.postCategory.findFirst({ where });
  }

  findAllActive() {
    return this.prisma.postCategory.findMany({
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
  }

  create(data: Prisma.PostCategoryCreateInput) {
    return this.prisma.postCategory.create({ data });
  }

  update(id: PrimaryKey, data: Prisma.PostCategoryUpdateInput) {
    return this.prisma.postCategory.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.postCategory.delete({ where: { id } });
  }
}
