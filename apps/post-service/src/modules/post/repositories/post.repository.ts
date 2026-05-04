import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

type Tx = Prisma.TransactionClient | PrismaService;

// Whitelist of columns that can come in via the request body. Anything
// outside this list is dropped before reaching Prisma to defeat
// mass-assignment via spread (e.g. attacker setting `created_user_id` or
// `view_count` from JSON body).
const ALLOWED_FIELDS: ReadonlySet<string> = new Set([
  'name',
  'slug',
  'excerpt',
  'content',
  'image',
  'cover_image',
  'status',
  'post_type',
  'video_url',
  'audio_url',
  'is_featured',
  'is_pinned',
  'published_at',
  'seo_title',
  'seo_description',
  'seo_keywords',
]);

const SORTABLE_FIELDS: ReadonlySet<string> = new Set([
  'name',
  'created_at',
  'updated_at',
  'published_at',
  'view_count',
  'is_featured',
  'is_pinned',
]);

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
      // Cap search length and use insensitive mode — Postgres `contains`
      // is case-sensitive by default and unbounded length is a DoS vector.
      const search = filter.search.slice(0, 100);
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
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
    // Allowlist sortable columns. Without this, an arbitrary `sort=foo:bar`
    // makes Prisma throw at runtime → 500 on a public endpoint, which is a
    // trivial DoS / fingerprinting vector.
    if (!field || !SORTABLE_FIELDS.has(field)) return { published_at: 'desc' };
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

  /**
   * Creates a post together with its stats row and optional category/tag
   * links inside a single transaction.  Returns the post with relations.
   */
  async createWithRelations(
    data: Record<string, any>,
    categoryIds?: any[],
    tagIds?: any[],
  ) {
    return this.prisma.$transaction(async (tx) => {
      const post = await this.create(data, tx);
      await this.createStats(post.id, tx);
      if (categoryIds?.length) {
        await this.syncCategories(post.id, categoryIds, tx);
      }
      if (tagIds?.length) {
        await this.syncTags(post.id, tagIds, tx);
      }
      return tx.post.findUnique({
        where: { id: post.id },
        include: WITH_RELATIONS,
      });
    });
  }

  /**
   * Updates a post and optionally syncs category/tag links atomically.
   */
  async updateWithRelations(
    id: any,
    data: Record<string, any>,
    categoryIds?: any[],
    tagIds?: any[],
  ) {
    return this.prisma.$transaction(async (tx) => {
      await this.update(id, data, tx);
      if (categoryIds !== undefined) {
        await this.syncCategories(id, categoryIds, tx);
      }
      if (tagIds !== undefined) {
        await this.syncTags(id, tagIds, tx);
      }
    });
  }

  create(data: Record<string, any>, tx: Tx = this.prisma) {
    return tx.post.create({
      data: this.normalizePayload(data) as Prisma.PostUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>, tx: Tx = this.prisma) {
    return tx.post.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.PostUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.post.delete({ where: { id: toPrimaryKey(id) } });
  }

  createStats(postId: any, tx: Tx = this.prisma) {
    return tx.stats.create({ data: { post_id: toPrimaryKey(postId) } });
  }

  async syncCategories(postId: any, categoryIds: any[], tx: Tx = this.prisma) {
    const pid = toPrimaryKey(postId);
    await tx.postCategory.deleteMany({ where: { post_id: pid } });
    if (categoryIds.length > 0) {
      await tx.postCategory.createMany({
        data: categoryIds.map((catId) => ({
          post_id: pid,
          category_id: toPrimaryKey(catId),
        })),
        skipDuplicates: true,
      });
    }
  }

  async syncTags(postId: any, tagIds: any[], tx: Tx = this.prisma) {
    const pid = toPrimaryKey(postId);
    await tx.postTag.deleteMany({ where: { post_id: pid } });
    if (tagIds.length > 0) {
      await tx.postTag.createMany({
        data: tagIds.map((tagId) => ({
          post_id: pid,
          tag_id: toPrimaryKey(tagId),
        })),
        skipDuplicates: true,
      });
    }
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    // Strict allowlist: drop everything that isn't a recognised content field.
    // Combined with the global ValidationPipe whitelist, this is the second
    // line of defense against mass-assignment via spread.
    const payload: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      if (ALLOWED_FIELDS.has(key)) payload[key] = data[key];
    }
    if (payload.published_at !== undefined) {
      payload.published_at = payload.published_at ? new Date(payload.published_at) : null;
    }
    return payload;
  }
}
