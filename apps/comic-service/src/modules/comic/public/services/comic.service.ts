import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PUBLIC_COMIC_STATUSES } from '../../enums/comic-status.enum';
import { ComicFilter, ComicRepository } from '../../repositories/comic.repository';

@Injectable()
export class PublicComicService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly comicRepo: ComicRepository,
    private readonly redis: RedisService,
  ) {}

  async getList(query: any = {}) {
    const version = await this.getVersion('comic:public:list:v');
    const cacheKey = `comic:public:list:${version}:${this.hashQuery(query)}`;

    return this.getOrSet(cacheKey, 60, async () => {
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

      return {
        data: data.map((c) => this.transform(c)),
        meta: createPaginationMeta(options, total),
      };
    });
  }

  async getBySlug(slug: string) {
    const cacheKey = `comic:public:detail:${slug}`;

    return this.getOrSet(cacheKey, 120, async () => {
      const comic = await this.comicRepo.findBySlug(slug, PUBLIC_COMIC_STATUSES);
      if (!comic) throw new NotFoundException('Comic not found');
      return this.transform(comic);
    });
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

    const chaptersVersion = await this.getVersion('comic:public:chapters:v');
    const cacheKey = `comic:public:chapters:${chaptersVersion}:${slug}:${this.hashQuery(query)}`;

    return this.getOrSet(cacheKey, 60, async () => {
      // Hard cap chapter list at 200 per page (was effectively unbounded with
      // `limit: query.limit ?? 10000` — trivial DoS).
      const options = parseQueryOptions(query, { defaultTake: 50, maxTake: 200 });

      const [data, total] = await Promise.all([
        this.comicRepo.findPublicChapters(comic.id, options),
        this.comicRepo.countPublicChapters(comic.id),
      ]);

      return { data, meta: createPaginationMeta(options, total) };
    });
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
    // Check cache first
    try {
      if (this.redis.isEnabled()) {
        const raw = await this.redis.get(key);
        if (raw) return JSON.parse(raw);
      }
    } catch {}

    // Single-flight: if another request is already loading this key, wait for it
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
