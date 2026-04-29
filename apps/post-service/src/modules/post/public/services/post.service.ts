import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { RedisService } from '../../../../redis/redis.service';
import { PUBLIC_POST_STATUSES } from '../../../../common/enums';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class PublicPostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: { in: PUBLIC_POST_STATUSES } };
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }
    if (query.post_category_id) {
      where.categoryLinks = {
        some: { post_category_id: BigInt(query.post_category_id) },
      };
    }
    if (query.post_tag_id) {
      where.tagLinks = {
        some: { post_tag_id: BigInt(query.post_tag_id) },
      };
    }
    if (query.post_type) {
      where.post_type = query.post_type;
    }
    if (query.is_featured !== undefined) {
      where.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }
    if (query.is_pinned !== undefined) {
      where.is_pinned = query.is_pinned === 'true' || query.is_pinned === true;
    }

    // Parse sort
    let orderBy: any = { published_at: 'desc' };
    if (query.sort) {
      const [field, dir] = query.sort.split(':');
      if (['view_count'].includes(field)) {
        orderBy = { stats: { [field]: dir || 'desc' } };
      } else {
        orderBy = { [field]: dir || 'desc' };
      }
    }

    const select = {
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
      categoryLinks: {
        select: { category: { select: { id: true, name: true, slug: true } } },
      },
      tagLinks: {
        select: { tag: { select: { id: true, name: true, slug: true } } },
      },
    };

    const [data, total] = await Promise.all([
      this.prisma.post.findMany({ where, select, orderBy, skip, take: limit }),
      this.prisma.post.count({ where }),
    ]);

    return {
      data: data.map((p) => this.transform(p)),
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async getBySlug(slug: string) {
    const post = await this.prisma.post.findFirst({
      where: { slug, status: { in: PUBLIC_POST_STATUSES } },
      include: {
        stats: true,
        categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
        tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
      },
    });
    if (!post) throw new NotFoundException('Post not found');

    // Increment view via Redis buffer
    if (this.redis.isEnabled()) {
      await this.redis.hincrby('post:views:buffer', post.id.toString(), 1);
    }

    return this.transform(post);
  }

  private transform(entity: any) {
    if (!entity) return null;
    const item = { ...entity };

    if (item.categoryLinks && Array.isArray(item.categoryLinks)) {
      item.categories = item.categoryLinks.map((l: any) => l?.category).filter(Boolean);
      delete item.categoryLinks;
    }

    if (item.tagLinks && Array.isArray(item.tagLinks)) {
      item.tags = item.tagLinks.map((l: any) => l?.tag).filter(Boolean);
      delete item.tagLinks;
    }

    return item;
  }
}
