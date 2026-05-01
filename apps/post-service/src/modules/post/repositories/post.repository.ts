import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface PostFilter {
  search?: string;
  status?: string | string[];
  post_type?: string;
  is_featured?: boolean;
  is_pinned?: boolean;
  category_id?: any;
  tag_id?: any;
  slug?: string;
}

const WITH_RELATIONS = {
  stats: true,
  categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
  tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
} as const;

const PUBLIC_SELECT = {
  id: true,
  slug: true,
  name: true,
  excerpt: true,
  image: true,
  cover_image: true,
  status: true,
  post_type: true,
  video_url: true,
  audio_url: true,
  is_featured: true,
  is_pinned: true,
  published_at: true,
  seo_title: true,
  seo_description: true,
  seo_keywords: true,
  created_at: true,
  updated_at: true,
  stats: true,
  categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
  tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
} as const;

const SIMPLE_SELECT = {
  id: true,
  name: true,
  slug: true,
  status: true,
} as const;

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: PostFilter): Prisma.PostWhereInput {
    const where: Prisma.PostWhereInput = {};
    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { slug: { contains: filter.search } },
      ];
    }
    if (filter.status !== undefined) {
      where.status = Array.isArray(filter.status) ? { in: filter.status } : filter.status;
    }
    if (filter.post_type) where.post_type = filter.post_type;
    if (filter.is_featured !== undefined) where.is_featured = filter.is_featured;
    if (filter.is_pinned !== undefined) where.is_pinned = filter.is_pinned;
    if (filter.category_id !== undefined) {
      where.categoryLinks = { some: { category_id: toPrimaryKey(filter.category_id) } };
    }
    if (filter.tag_id !== undefined) {
      where.tagLinks = { some: { tag_id: toPrimaryKey(filter.tag_id) } };
    }
    if (filter.slug) where.slug = filter.slug;
    return where;
  }

  private buildOrderBy(sort?: string): Prisma.PostOrderByWithRelationInput {
    if (!sort) return { published_at: 'desc' };
    const [field, dirRaw] = sort.split(':');
    const dir: 'asc' | 'desc' = dirRaw?.toLowerCase() === 'asc' ? 'asc' : 'desc';
    if (field === 'view_count') return { stats: { view_count: dir } };
    return { [field]: dir } as Prisma.PostOrderByWithRelationInput;
  }

  findMany(filter: PostFilter, options: { skip: number; take: number }) {
    return this.prisma.post.findMany({
      where: this.buildWhere(filter),
      include: WITH_RELATIONS,
      orderBy: { updated_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(filter: PostFilter, options: { skip: number; take: number; sort?: string }) {
    return this.prisma.post.findMany({
      where: this.buildWhere(filter),
      select: PUBLIC_SELECT,
      orderBy: this.buildOrderBy(options.sort),
      skip: options.skip,
      take: options.take,
    });
  }

  findSimpleMany(filter: PostFilter, take: number) {
    return this.prisma.post.findMany({
      where: this.buildWhere(filter),
      select: SIMPLE_SELECT,
      orderBy: { name: 'asc' },
      take,
    });
  }

  count(filter: PostFilter) {
    return this.prisma.post.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.post.findUnique({
      where: { id: toPrimaryKey(id) },
      include: WITH_RELATIONS,
    });
  }

  findBySlug(slug: string, statuses?: string[]) {
    const where: Prisma.PostWhereInput = { slug };
    if (statuses?.length) where.status = { in: statuses };
    return this.prisma.post.findFirst({ where, include: WITH_RELATIONS });
  }

  findBySlugSimple(slug: string) {
    return this.prisma.post.findUnique({ where: { slug } });
  }

  create(data: Record<string, any>) {
    return this.prisma.post.create({
      data: this.normalizePayload(data) as Prisma.PostUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.post.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.PostUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.post.delete({ where: { id: toPrimaryKey(id) } });
  }

  createStats(postId: any) {
    return this.prisma.stats.create({ data: { post_id: toPrimaryKey(postId) } });
  }

  async syncCategories(postId: any, categoryIds: any[]) {
    const pid = toPrimaryKey(postId);
    await this.prisma.postCategory.deleteMany({ where: { post_id: pid } });
    if (categoryIds.length > 0) {
      await this.prisma.postCategory.createMany({
        data: categoryIds.map((catId) => ({
          post_id: pid,
          category_id: toPrimaryKey(catId),
        })),
      });
    }
  }

  async syncTags(postId: any, tagIds: any[]) {
    const pid = toPrimaryKey(postId);
    await this.prisma.postTag.deleteMany({ where: { post_id: pid } });
    if (tagIds.length > 0) {
      await this.prisma.postTag.createMany({
        data: tagIds.map((tagId) => ({
          post_id: pid,
          tag_id: toPrimaryKey(tagId),
        })),
      });
    }
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    delete payload.category_ids;
    delete payload.tag_ids;
    if (payload.published_at !== undefined) {
      payload.published_at = payload.published_at ? new Date(payload.published_at) : null;
    }
    const bigIntFields = ['created_user_id', 'updated_user_id', 'group_id'];
    for (const field of bigIntFields) {
      const value = payload[field];
      if (value === undefined) continue;
      payload[field] = value === null || value === '' ? null : toPrimaryKey(value);
    }
    return payload;
  }
}
