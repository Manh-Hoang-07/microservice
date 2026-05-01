import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface ComicFilter {
  search?: string;
  status?: string | string[];
  is_featured?: boolean;
  category_id?: any;
  author?: string;
  slug?: string;
}

const WITH_RELATIONS = {
  stats: true,
  categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
} as const;

const PUBLIC_SELECT = {
  id: true,
  slug: true,
  title: true,
  description: true,
  cover_image: true,
  author: true,
  status: true,
  created_at: true,
  updated_at: true,
  last_chapter_id: true,
  last_chapter_updated_at: true,
  is_featured: true,
  stats: true,
  categoryLinks: {
    select: { category: { select: { id: true, name: true, slug: true } } },
  },
  chapters: {
    where: { status: 'published' as const },
    orderBy: { chapter_index: 'desc' as const },
    take: 1,
    select: {
      id: true,
      title: true,
      chapter_index: true,
      chapter_label: true,
      created_at: true,
    },
  },
} as const;

const SIMPLE_SELECT = {
  id: true,
  title: true,
  slug: true,
  status: true,
} as const;

@Injectable()
export class ComicRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: ComicFilter): Prisma.ComicWhereInput {
    const where: Prisma.ComicWhereInput = {};
    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search } },
        { slug: { contains: filter.search } },
        { author: { contains: filter.search } },
      ];
    }
    if (filter.status !== undefined) {
      where.status = Array.isArray(filter.status) ? { in: filter.status } : filter.status;
    }
    if (filter.is_featured !== undefined) where.is_featured = filter.is_featured;
    if (filter.author) where.author = filter.author;
    if (filter.slug) where.slug = filter.slug;
    if (filter.category_id !== undefined) {
      where.categoryLinks = { some: { category_id: toPrimaryKey(filter.category_id) } };
    }
    return where;
  }

  private buildOrderBy(sort?: string): Prisma.ComicOrderByWithRelationInput {
    if (!sort) return { updated_at: 'desc' };
    const [field, dirRaw] = sort.split(':');
    const dir: 'asc' | 'desc' = dirRaw?.toLowerCase() === 'asc' ? 'asc' : 'desc';
    if (['view_count', 'follow_count', 'rating_count', 'rating_sum'].includes(field)) {
      return { stats: { [field]: dir } } as Prisma.ComicOrderByWithRelationInput;
    }
    return { [field]: dir } as Prisma.ComicOrderByWithRelationInput;
  }

  findMany(filter: ComicFilter, options: { skip: number; take: number }) {
    return this.prisma.comic.findMany({
      where: this.buildWhere(filter),
      include: WITH_RELATIONS,
      orderBy: { updated_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(filter: ComicFilter, options: { skip: number; take: number; sort?: string }) {
    return this.prisma.comic.findMany({
      where: this.buildWhere(filter),
      select: PUBLIC_SELECT,
      orderBy: this.buildOrderBy(options.sort),
      skip: options.skip,
      take: options.take,
    });
  }

  findSimpleMany(filter: ComicFilter, take: number) {
    return this.prisma.comic.findMany({
      where: this.buildWhere(filter),
      select: SIMPLE_SELECT,
      orderBy: { title: 'asc' },
      take,
    });
  }

  count(filter: ComicFilter) {
    return this.prisma.comic.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.comic.findUnique({
      where: { id: toPrimaryKey(id) },
      include: WITH_RELATIONS,
    });
  }

  findBySlug(slug: string, statuses?: string[]) {
    const where: Prisma.ComicWhereInput = { slug };
    if (statuses?.length) where.status = { in: statuses };
    return this.prisma.comic.findFirst({
      where,
      select: PUBLIC_SELECT,
    });
  }

  findIdBySlug(slug: string, statuses?: string[]) {
    const where: Prisma.ComicWhereInput = { slug };
    if (statuses?.length) where.status = { in: statuses };
    return this.prisma.comic.findFirst({ where, select: { id: true } });
  }

  findBySlugSimple(slug: string) {
    return this.prisma.comic.findUnique({ where: { slug } });
  }

  create(data: Record<string, any>) {
    return this.prisma.comic.create({
      data: this.normalizePayload(data) as Prisma.ComicUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.comic.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.ComicUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.comic.delete({ where: { id: toPrimaryKey(id) } });
  }

  createStats(comicId: any) {
    return this.prisma.stats.create({ data: { comic_id: toPrimaryKey(comicId) } });
  }

  async syncCategories(comicId: any, categoryIds: any[]) {
    const cid = toPrimaryKey(comicId);
    await this.prisma.comicCategory.deleteMany({ where: { comic_id: cid } });
    if (categoryIds.length > 0) {
      await this.prisma.comicCategory.createMany({
        data: categoryIds.map((catId) => ({
          comic_id: cid,
          category_id: toPrimaryKey(catId),
        })),
      });
    }
  }

  findPublicChapters(comicId: any, options: { skip: number; take: number }) {
    return this.prisma.chapter.findMany({
      where: { comic_id: toPrimaryKey(comicId), status: 'published' },
      select: {
        id: true,
        comic_id: true,
        title: true,
        chapter_index: true,
        chapter_label: true,
        status: true,
        view_count: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { chapter_index: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  countPublicChapters(comicId: any) {
    return this.prisma.chapter.count({
      where: { comic_id: toPrimaryKey(comicId), status: 'published' },
    });
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    delete payload.category_ids;
    const bigIntFields = ['created_user_id', 'updated_user_id', 'group_id', 'last_chapter_id'];
    for (const field of bigIntFields) {
      const value = payload[field];
      if (value === undefined) continue;
      payload[field] = value === null || value === '' ? null : toPrimaryKey(value);
    }
    return payload;
  }
}
