import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PUBLIC_POST_STATUSES } from '../../enums/post-status.enum';
import { PostFilter, PostRepository } from '../../repositories/post.repository';

@Injectable()
export class PublicPostService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly postRepo: PostRepository,
    private readonly redis: RedisService,
  ) {}

  async getList(query: any = {}) {
    const version = await this.getVersion('post:public:list:v');
    const cacheKey = `post:public:list:${version}:${this.hashQuery(query)}`;

    return this.getOrSet(cacheKey, 60, async () => {
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

      return {
        data: data.map((p) => this.transform(p)),
        meta: createPaginationMeta(options, total),
      };
    });
  }

  async getBySlug(slug: string, requesterKey?: string) {
    // View counting must happen outside getOrSet since it's per-request, not per-cache-miss
    const post = await this.postRepo.findBySlug(slug, PUBLIC_POST_STATUSES);
    if (!post) throw new NotFoundException('Post not found');

    if (this.redis.isEnabled() && requesterKey) {
      const dedupKey = `post:view:seen:${post.id}:${requesterKey}`;
      const acquired = await this.redis.setnx(dedupKey, '1', 300);
      if (acquired) {
        await this.redis.hincrby('post:views:buffer', post.id.toString(), 1);
      }
    }

    const cacheKey = `post:public:detail:${slug}`;

    return this.getOrSet(cacheKey, 120, async () => {
      return this.transform(post);
    });
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

  private async getVersion(key: string): Promise<string> {
    try {
      if (this.redis.isEnabled()) {
        return (await this.redis.get(key)) || '0';
      }
    } catch {}
    return '0';
  }

  private hashQuery(query: any): string {
    const stableStr = JSON.stringify(
      query,
      (_, v) => {
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          return Object.keys(v).sort().reduce((o: any, k) => { o[k] = v[k]; return o; }, {});
        }
        return typeof v === 'bigint' ? Number(v) : v;
      },
    );
    let hash = 5381;
    for (let i = 0; i < stableStr.length; i++) hash = ((hash << 5) + hash + stableStr.charCodeAt(i)) | 0;
    return (hash >>> 0).toString(36);
  }

  private async getOrSet<T>(key: string, ttl: number, factory: () => Promise<T>): Promise<T> {
    try {
      if (this.redis.isEnabled()) {
        const raw = await this.redis.get(key);
        if (raw) return JSON.parse(raw);
      }
    } catch {}

    const existing = this.inflight.get(key);
    if (existing) return existing as Promise<T>;

    const promise = factory().then(async (result) => {
      try {
        if (this.redis.isEnabled()) {
          await this.redis.set(
            key,
            JSON.stringify(result, (_, v) => (typeof v === 'bigint' ? Number(v) : v)),
            ttl,
          );
        }
      } catch {}
      return result;
    }).finally(() => {
      this.inflight.delete(key);
    });

    this.inflight.set(key, promise);
    return promise;
  }
}
