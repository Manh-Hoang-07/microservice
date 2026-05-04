import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PUBLIC_COMIC_STATUSES } from '../../enums/comic-status.enum';
import { ComicFilter, ComicRepository } from '../../repositories/comic.repository';

@Injectable()
export class PublicComicService {
  constructor(
    private readonly comicRepo: ComicRepository,
    private readonly redis: RedisService,
  ) {}

  async getList(query: any = {}) {
    const cacheKey = `comic:public:list:${this.hashQuery(query)}`;
    const cached = await this.cacheGet(cacheKey);
    if (cached) return cached;

    const options = parseQueryOptions(query);

    const filter: ComicFilter = { status: PUBLIC_COMIC_STATUSES };
    if (query.search) filter.search = query.search;
    if (query.is_featured !== undefined) {
      filter.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }
    if (query.comic_category_id || query.category_id) {
      filter.category_id = query.comic_category_id ?? query.category_id;
    }

    const [data, total] = await Promise.all([
      this.comicRepo.findManyPublic(filter, { ...options, sort: query.sort }),
      this.comicRepo.count(filter),
    ]);

    const result = {
      data: data.map((c) => this.transform(c)),
      meta: createPaginationMeta(options, total),
    };

    await this.cacheSet(cacheKey, result, 60);
    return result;
  }

  async getBySlug(slug: string) {
    const cacheKey = `comic:public:detail:${slug}`;
    const cached = await this.cacheGet(cacheKey);
    if (cached) return cached;

    const comic = await this.comicRepo.findBySlug(slug, PUBLIC_COMIC_STATUSES);
    if (!comic) throw new NotFoundException('Comic not found');
    const result = this.transform(comic);

    await this.cacheSet(cacheKey, result, 120);
    return result;
  }

  async getChaptersBySlug(slug: string, query: any = {}, requesterKey?: string) {
    const comic = await this.comicRepo.findIdBySlug(slug, PUBLIC_COMIC_STATUSES);
    if (!comic) throw new NotFoundException('Comic not found');

    // View-counter dedup: same requester (user id or IP) counts at most once
    // every 5 min per comic. Without this a single bot inflates view_count
    // arbitrarily by replaying GET. Skip increment if we can't identify the
    // requester at all to keep the counter honest.
    if (this.redis.isEnabled() && requesterKey) {
      const dedupKey = `comic:view:seen:${comic.id}:${requesterKey}`;
      const acquired = await this.redis.setnx(dedupKey, '1', 300);
      if (acquired) {
        await this.redis.hincrby('comic:views:buffer', comic.id.toString(), 1);
      }
    }

    const cacheKey = `comic:public:chapters:${slug}:${this.hashQuery(query)}`;
    const cached = await this.cacheGet(cacheKey);
    if (cached) return cached;

    // Hard cap chapter list at 200 per page (was effectively unbounded with
    // `limit: query.limit ?? 10000` — trivial DoS).
    const options = parseQueryOptions(query, { defaultTake: 50, maxTake: 200 });

    const [data, total] = await Promise.all([
      this.comicRepo.findPublicChapters(comic.id, options),
      this.comicRepo.countPublicChapters(comic.id),
    ]);

    const result = { data, meta: createPaginationMeta(options, total) };

    await this.cacheSet(cacheKey, result, 60);
    return result;
  }

  private transform(entity: any) {
    if (!entity) return null;
    const item = { ...entity };

    if (Array.isArray(item.categoryLinks)) {
      item.categories = item.categoryLinks.map((l: any) => l?.category).filter(Boolean);
      delete item.categoryLinks;
    }

    if (Array.isArray(item.chapters)) {
      const last = item.chapters[0];
      if (last) {
        item.last_chapter = {
          id: last.id,
          title: last.title,
          chapter_index: last.chapter_index,
          chapter_label: last.chapter_label,
          created_at: last.created_at,
        };
      }
      delete item.chapters;
    }

    return item;
  }

  private hashQuery(query: any): string {
    const str = JSON.stringify(query, (_, v) => (typeof v === 'bigint' ? v.toString() : v));
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return hash.toString(36);
  }

  private async cacheGet(key: string): Promise<any | null> {
    try {
      if (!this.redis.isEnabled()) return null;
      const raw = await this.redis.get(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private async cacheSet(key: string, value: any, ttl: number): Promise<void> {
    try {
      if (!this.redis.isEnabled()) return;
      await this.redis.set(
        key,
        JSON.stringify(value, (_, v) => (typeof v === 'bigint' ? Number(v) : v)),
        ttl,
      );
    } catch {
      // silent — cache failure must not break the endpoint
    }
  }
}
