import { Injectable } from '@nestjs/common';
import { ComicClient } from '../../clients/comic.client';
import { PostClient } from '../../clients/post.client';
import { GatewayCacheService } from '../../cache/cache.service';

@Injectable()
export class GatewaySearchService {
  constructor(
    private readonly comicClient: ComicClient,
    private readonly postClient: PostClient,
    private readonly cache: GatewayCacheService,
  ) {}

  async search(query: string, page = 1, limit = 10) {
    const cacheKey = `search:all:${query}:${page}:${limit}`;
    return this.cache.getOrSet(cacheKey, async () => {
      const [comics, posts] = await Promise.allSettled([
        this.comicClient.searchComics(query, { page, limit }),
        this.postClient.searchPosts(query, { page, limit }),
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
