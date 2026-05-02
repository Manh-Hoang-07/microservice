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
      const search = filter.search.slice(0, 100);
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (filter.parent_id !== undefined) {
      where.parent_id = filter.parent_id === null ? null : toPrimaryKey(filter.parent_id);
    }
    if (filter.is_active !== undefined) where.is_active = filter.is_active;
    return where;
  }

  /** Walk up the parent chain — used to detect cycles before saving. */
  async getParentId(id: bigint): Promise<bigint | null> {
    const row = await this.prisma.category.findUnique({
      where: { id },
      select: { parent_id: true },
    });
    return row?.parent_id ?? null;
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
    const ALLOWED: ReadonlySet<string> = new Set([
      'name',
      'slug',
      'description',
      'parent_id',
      'sort_order',
      'is_active',
      'seo_title',
      'seo_description',
      'seo_keywords',
    ]);
    const payload: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      if (ALLOWED.has(key)) payload[key] = data[key];
    }
    if (payload.parent_id !== undefined) {
      payload.parent_id =
        payload.parent_id === null || payload.parent_id === ''
          ? null
          : toPrimaryKey(payload.parent_id);
    }
    return payload;
  }
}
