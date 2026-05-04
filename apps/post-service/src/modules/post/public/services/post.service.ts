import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PUBLIC_POST_STATUSES } from '../../enums/post-status.enum';
import { PostFilter, PostRepository } from '../../repositories/post.repository';

@Injectable()
export class PublicPostService {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly redis: RedisService,
  ) {}

  async getList(query: any = {}) {
    const cacheKey = `post:public:list:${JSON.stringify(query)}`;
    try {
      const cached = await this.redis.get(cacheKey);
      if (cached) return JSON.parse(cached);
    } catch {}

    const options = parseQueryOptions(query);

    const filter: PostFilter = { status: PUBLIC_POST_STATUSES };
    if (query.search) filter.search = query.search;
    if (query.post_type) filter.post_type = query.post_type;
    if (query.is_featured !== undefined) {
      filter.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }
    if (query.is_pinned !== undefined) {
      filter.is_pinned = query.is_pinned === 'true' || query.is_pinned === true;
    }
    if (query.post_category_id || query.category_id) {
      filter.category_id = query.post_category_id ?? query.category_id;
    }
    if (query.post_tag_id || query.tag_id) {
      filter.tag_id = query.post_tag_id ?? query.tag_id;
    }

    const [data, total] = await Promise.all([
      this.postRepo.findManyPublic(filter, { ...options, sort: query.sort }),
      this.postRepo.count(filter),
    ]);

    const result = {
      data: data.map((p) => this.transform(p)),
      meta: createPaginationMeta(options, total),
    };

    try {
      await this.redis.set(cacheKey, JSON.stringify(result), 60);
    } catch {}

    return result;
  }

  async getBySlug(slug: string, requesterKey?: string) {
    const cacheKey = `post:public:detail:${slug}`;
    try {
      const cached = await this.redis.get(cacheKey);
      if (cached) return JSON.parse(cached);
    } catch {}

    const post = await this.postRepo.findBySlug(slug, PUBLIC_POST_STATUSES);
    if (!post) throw new NotFoundException('Post not found');

    // View-counter dedup: same requester (user id or IP) counts at most once
    // every 5 min per post. Without this, a single bot inflates view_count
    // arbitrarily by replaying GET. Skip the increment when we can't
    // identify the requester rather than running unbounded.
    if (this.redis.isEnabled() && requesterKey) {
      const dedupKey = `post:view:seen:${post.id}:${requesterKey}`;
      const acquired = await this.redis.setnx(dedupKey, '1', 300);
      if (acquired) {
        await this.redis.hincrby('post:views:buffer', post.id.toString(), 1);
      }
    }

    const result = this.transform(post);

    try {
      await this.redis.set(cacheKey, JSON.stringify(result), 120);
    } catch {}

    return result;
  }

  private transform(entity: any) {
    if (!entity) return null;
    const item = { ...entity };
    if (Array.isArray(item.categoryLinks)) {
      item.categories = item.categoryLinks.map((l: any) => l?.category).filter(Boolean);
      delete item.categoryLinks;
    }
    if (Array.isArray(item.tagLinks)) {
      item.tags = item.tagLinks.map((l: any) => l?.tag).filter(Boolean);
      delete item.tagLinks;
    }
    return item;
  }
}
