import { Injectable } from '@nestjs/common';
import { ComicClient } from '../../clients/comic.client';
import { MainClient } from '../../clients/main.client';
import { BffCacheService } from '../../cache/bff-cache.service';

const TTL = {
  TOP_VIEWED: 420,    // 7 min
  POPULAR: 1200,      // 20 min
  NEWEST: 120,        // 2 min
  LATEST_CHAPTERS: 120,
  CATEGORIES: 43200,  // 12 h
  LATEST_POSTS: 300,  // 5 min
};

@Injectable()
export class BffHomepageService {
  constructor(
    private readonly comicClient: ComicClient,
    private readonly mainClient: MainClient,
    private readonly cache: BffCacheService,
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
        () => this.comicClient.getComics({ limit: 8, sort: 'view_count:DESC' }),
        TTL.TOP_VIEWED,
      ),

      this.cache.getOrSet(
        'homepage:comics:popular',
        () => this.comicClient.getComics({ limit: 8, sort: 'follow_count:DESC' }),
        TTL.POPULAR,
      ),

      this.cache.getOrSet(
        'homepage:comics:newest',
        () => this.comicClient.getComics({ limit: 8, sort: 'created_at:DESC' }),
        TTL.NEWEST,
      ),

      this.cache.getOrSet(
        'homepage:chapters:latest',
        () => this.comicClient.getLatestChapters(8),
        TTL.LATEST_CHAPTERS,
      ),

      this.cache.getOrSet(
        'homepage:categories',
        () => this.comicClient.getCategories(),
        TTL.CATEGORIES,
      ),

      this.cache.getOrSet(
        'homepage:posts:latest',
        () => this.mainClient.getLatestPosts(6),
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
    const keys = [
      'homepage:comics:top_viewed',
      'homepage:comics:popular',
      'homepage:comics:newest',
      'homepage:chapters:latest',
      'homepage:categories',
      'homepage:posts:latest',
    ];
    await Promise.all(keys.map((k) => this.cache.del(k)));
  }
}
