import { Injectable } from '@nestjs/common';
import { ComicClient } from '../clients/comic.client';
import { MainClient } from '../clients/main.client';
import { BffCacheService } from '../cache/bff-cache.service';

@Injectable()
export class BffSearchService {
  constructor(
    private readonly comicClient: ComicClient,
    private readonly mainClient: MainClient,
    private readonly cache: BffCacheService,
  ) {}

  async search(query: string, page = 1, limit = 10) {
    const cacheKey = `search:all:${query}:${page}:${limit}`;
    return this.cache.getOrSet(cacheKey, async () => {
      const [comics, posts] = await Promise.allSettled([
        this.comicClient.searchComics(query, { page, limit }),
        this.mainClient.searchPosts(query, { page, limit }),
      ]);
      return {
        comics: comics.status === 'fulfilled' ? comics.value : [],
        posts: posts.status === 'fulfilled' ? posts.value : [],
        query,
        page,
        limit,
      };
    }, 30);
  }
}
