import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { PUBLIC_POST_STATUSES } from '../../enums/post-status.enum';
import { createPaginationMeta } from '@package/common';
import { PostRepository } from '../../repositories/post.repository';

@Injectable()
export class PublicPostService {
  constructor(
    private readonly postRepo: PostRepository,
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
      where.categoryLinks = { some: { post_category_id: BigInt(query.post_category_id) } };
    }
    if (query.post_tag_id) {
      where.tagLinks = { some: { post_tag_id: BigInt(query.post_tag_id) } };
    }
    if (query.post_type) where.post_type = query.post_type;
    if (query.is_featured !== undefined) {
      where.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }
    if (query.is_pinned !== undefined) {
      where.is_pinned = query.is_pinned === 'true' || query.is_pinned === true;
    }

    let orderBy: any = { published_at: 'desc' };
    if (query.sort) {
      const [field, dir] = query.sort.split(':');
      if (['view_count'].includes(field)) {
        orderBy = { stats: { [field]: dir || 'desc' } };
      } else {
        orderBy = { [field]: dir || 'desc' };
      }
    }

    const [data, total] = await Promise.all([
      this.postRepo.findManyPublic(where, { skip, take: limit }, orderBy),
      this.postRepo.count(where),
    ]);

    return {
      data: data.map((p) => this.transform(p)),
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async getBySlug(slug: string) {
    const post = await this.postRepo.findBySlug(slug, PUBLIC_POST_STATUSES);
    if (!post) throw new NotFoundException('Post not found');

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
