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
  }

  async getBySlug(slug: string) {
    const comic = await this.comicRepo.findBySlug(slug, PUBLIC_COMIC_STATUSES);
    if (!comic) throw new NotFoundException('Comic not found');
    return this.transform(comic);
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

    // Hard cap chapter list at 200 per page (was effectively unbounded with
    // `limit: query.limit ?? 10000` — trivial DoS).
    const options = parseQueryOptions(query, { defaultTake: 50, maxTake: 200 });

    const [data, total] = await Promise.all([
      this.comicRepo.findPublicChapters(comic.id, options),
      this.comicRepo.countPublicChapters(comic.id),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
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
}
