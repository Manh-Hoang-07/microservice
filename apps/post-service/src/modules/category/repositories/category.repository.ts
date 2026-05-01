import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface CategoryFilter {
  search?: string;
  parent_id?: any;
  is_active?: boolean;
}

const WITH_CHILDREN = {
  children: { orderBy: { sort_order: 'asc' as const } },
} as const;

const PUBLIC_TREE_SELECT = {
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
    orderBy: { sort_order: 'asc' as const },
  },
} as const;

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: CategoryFilter): Prisma.CategoryWhereInput {
    const where: Prisma.CategoryWhereInput = {};
    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { slug: { contains: filter.search } },
      ];
    }
    if (filter.parent_id !== undefined) {
      where.parent_id = filter.parent_id === null ? null : toPrimaryKey(filter.parent_id);
    }
    if (filter.is_active !== undefined) where.is_active = filter.is_active;
    return where;
  }

  findMany(filter: CategoryFilter, options: { skip: number; take: number }) {
    return this.prisma.category.findMany({
      where: this.buildWhere(filter),
      include: WITH_CHILDREN,
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: CategoryFilter) {
    return this.prisma.category.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.category.findUnique({
      where: { id: toPrimaryKey(id) },
      include: WITH_CHILDREN,
    });
  }

  findBySlug(slug: string) {
    return this.prisma.category.findUnique({ where: { slug } });
  }

  findRootActiveTree() {
    return this.prisma.category.findMany({
      where: { is_active: true, parent_id: null },
      select: PUBLIC_TREE_SELECT,
      orderBy: { sort_order: 'asc' },
    });
  }

  create(data: Record<string, any>) {
    return this.prisma.category.create({
      data: this.normalizePayload(data) as Prisma.CategoryUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.category.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.CategoryUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.category.delete({ where: { id: toPrimaryKey(id) } });
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    const bigIntFields = ['parent_id', 'created_user_id', 'updated_user_id', 'group_id'];
    for (const field of bigIntFields) {
      const value = payload[field];
      if (value === undefined) continue;
      payload[field] = value === null || value === '' ? null : toPrimaryKey(value);
    }
    return payload;
  }
}
