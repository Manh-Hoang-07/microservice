import { Injectable } from '@nestjs/common';
import { ComicClient } from '../../clients/comic.client';
import { GatewayCacheService } from '../../cache/cache.service';

@Injectable()
export class GatewayComicsService {
  constructor(
    private readonly comicClient: ComicClient,
    private readonly cache: GatewayCacheService,
  ) {}

  async getComicDetail(slug: string) {
    return this.cache.getOrSet(`comic:detail:${slug}`, () => this.comicClient.getComic(slug), 300);
  }

  async getComicChapters(slug: string, page = 1, limit = 30) {
    return this.cache.getOrSet(
      `comic:chapters:${slug}:${page}:${limit}`,
      () => this.comicClient.getComicChapters(slug, { page, limit }),
      120,
    );
  }

  async getChapterDetail(chapterId: string) {
    return this.cache.getOrSet(
      `chapter:${chapterId}`,
      () => this.comicClient.getChapter(chapterId),
      600,
    );
  }

  async getChapterPages(chapterId: string) {
    return this.cache.getOrSet(
      `chapter:pages:${chapterId}`,
      () => this.comicClient.getChapterPages(chapterId),
      600,
    );
  }

  async getComicComments(comicId: string, page = 1, limit = 20) {
    return this.cache.getOrSet(
      `comic:comments:${comicId}:${page}`,
      () => this.comicClient.getComicComments(comicId, { page, limit }),
      60,
    );
  }

  async getComicReviews(comicId: string, page = 1, limit = 10) {
    return this.cache.getOrSet(
      `comic:reviews:${comicId}:${page}`,
      () => this.comicClient.getComicReviews(comicId, { page, limit }),
      300,
    );
  }

  async getComicsByCategory(categoryId: string, page = 1, limit = 24, sort = 'updated_at:desc') {
    return this.cache.getOrSet(
      `comics:cat:${categoryId}:${page}:${limit}:${sort}`,
      () => this.comicClient.getComicsByCategory(categoryId, { page, limit, sort }),
      120,
    );
  }

  async searchComics(query: string, page = 1, limit = 20, category?: string) {
    return this.cache.getOrSet(
      `search:comics:${query}:${page}:${limit}:${category ?? ''}`,
      () => this.comicClient.searchComics(query, { page, limit, category }),
      30,
    );
  }
}
