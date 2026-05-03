import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
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
    // Normalise the query before keying: trim, lowercase, hash. Hashing
    // bounds key length so an attacker can't fill Redis with junk keys.
    const normalised = (query || '').trim().toLowerCase();
    const queryHash = normalised
      ? createHash('sha1').update(normalised).digest('hex').slice(0, 16)
      : 'empty';
    const cacheKey = `search:all:${queryHash}:${page}:${limit}`;

    return this.cache.getOrSet(
      cacheKey,
      async () => {
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
          // Tag whether either upstream actually succeeded so the cache layer
          // can skip persisting double-failures.
          _ok: comics.status === 'fulfilled' || posts.status === 'fulfilled',
        };
      },
      {
        ttlSeconds: 30,
        // If both upstreams failed, do not cache — otherwise the next 30s
        // of search traffic gets the same empty result without ever retrying.
        shouldCache: (value) => (value as any)._ok === true,
      },
    ).then((value) => {
      // Strip the internal flag before returning to the client.
      if (value && typeof value === 'object' && '_ok' in value) {
        const { _ok, ...rest } = value as any;
        return rest;
      }
      return value;
    });
  }
}
