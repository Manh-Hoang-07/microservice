import { Injectable } from '@nestjs/common';
import { ComicClient } from '../../clients/comic.client';
import { PostClient } from '../../clients/post.client';
import { GatewayCacheService } from '../../cache/cache.service';

const TTL = {
  TOP_VIEWED: 420, // 7 min
  POPULAR: 1200, // 20 min
  NEWEST: 120, // 2 min
  RECENT_UPDATED: 120,
  CATEGORIES: 43200, // 12 h
  LATEST_POSTS: 300, // 5 min
};

const CACHE_KEYS = [
  'homepage:comics:top_viewed',
  'homepage:comics:popular',
  'homepage:comics:newest',
  'homepage:comics:recent_updated',
  'homepage:categories',
  'homepage:posts:latest',
];

@Injectable()
export class GatewayHomepageService {
  constructor(
    private readonly comicClient: ComicClient,
    private readonly postClient: PostClient,
    private readonly cache: GatewayCacheService,
  ) {}

  async getHomepageData() {
    const [
      topViewedComics,
      popularComics,
      newestComics,
      recentUpdateComics,
      comicCategories,
      latestPosts,
    ] = await Promise.all([
      this.cache.getOrSet(
        'homepage:comics:top_viewed',
        () => this.comicClient.getTopViewed(8),
        TTL.TOP_VIEWED,
      ),
      this.cache.getOrSet(
        'homepage:comics:popular',
        () => this.comicClient.getPopular(8),
        TTL.POPULAR,
      ),
      this.cache.getOrSet(
        'homepage:comics:newest',
        () => this.comicClient.getNewest(8),
        TTL.NEWEST,
      ),
      this.cache.getOrSet(
        'homepage:comics:recent_updated',
        () => this.comicClient.getRecentlyUpdated(8),
        TTL.RECENT_UPDATED,
      ),
      this.cache.getOrSet(
        'homepage:categories',
        () => this.comicClient.getCategories(),
        TTL.CATEGORIES,
      ),
      this.cache.getOrSet(
        'homepage:posts:latest',
        () => this.postClient.getLatestPosts(6),
        TTL.LATEST_POSTS,
      ),
    ]);

    return {
      top_viewed_comics: topViewedComics,
      trending_comics: topViewedComics,
      popular_comics: popularComics,
      newest_comics: newestComics,
      recent_update_comics: recentUpdateComics,
      comic_categories: comicCategories,
      latest_posts: latestPosts,
    };
  }

  async clearCache(): Promise<void> {
    await Promise.all(CACHE_KEYS.map((k) => this.cache.del(k)));
  }
}
