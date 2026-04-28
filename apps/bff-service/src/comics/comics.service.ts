import { Injectable } from '@nestjs/common';
import { ComicClient } from '../clients/comic.client';
import { BffCacheService } from '../cache/bff-cache.service';

@Injectable()
export class BffComicsService {
  constructor(
    private readonly comicClient: ComicClient,
    private readonly cache: BffCacheService,
  ) {}

  async getComicDetail(slug: string) {
    return this.cache.getOrSet(`comic:detail:${slug}`, () => this.comicClient.getComic(slug), 300);
  }

  async getComicChapters(slug: string, page = 1, limit = 30) {
    // chapters change frequently — short TTL
    return this.cache.getOrSet(
      `comic:chapters:${slug}:${page}:${limit}`,
      () => this.comicClient.getComicChapters(slug, { page, limit }),
      120,
    );
  }

  async getChapterDetail(comicSlug: string, chapterSlug: string) {
    // chapter pages rarely change — longer TTL
    return this.cache.getOrSet(
      `chapter:${comicSlug}:${chapterSlug}`,
      () => this.comicClient.getChapter(comicSlug, chapterSlug),
      600,
    );
  }

  async getComicComments(slug: string, page = 1, limit = 20) {
    return this.cache.getOrSet(
      `comic:comments:${slug}:${page}`,
      () => this.comicClient.getComicComments(slug, { page, limit }),
      60,
    );
  }

  async getComicReviews(slug: string, page = 1, limit = 10) {
    return this.cache.getOrSet(
      `comic:reviews:${slug}:${page}`,
      () => this.comicClient.getComicReviews(slug, { page, limit }),
      300,
    );
  }

  async getComicsByCategory(categorySlug: string, page = 1, limit = 24, sort = 'updated_at') {
    return this.cache.getOrSet(
      `comics:cat:${categorySlug}:${page}:${limit}:${sort}`,
      () => this.comicClient.getComicsByCategory(categorySlug, { page, limit, sort }),
      120,
    );
  }

  async searchComics(query: string, page = 1, limit = 20, category?: string) {
    // search results — short TTL
    return this.cache.getOrSet(
      `search:comics:${query}:${page}:${limit}:${category ?? ''}`,
      () => this.comicClient.searchComics(query, { page, limit, category }),
      30,
    );
  }

  async getTopComics(type: 'day' | 'week' | 'month' | 'all' = 'week', limit = 10) {
    return this.cache.getOrSet(
      `comics:top:${type}:${limit}`,
      () => this.comicClient.getTopComics(type, limit),
      300,
    );
  }
}
