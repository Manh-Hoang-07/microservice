import { Injectable } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { PUBLIC_COMIC_STATUSES } from '../../comic/enums/comic-status.enum';
import { HomepageRepository } from '../repositories/homepage.repository';

@Injectable()
export class HomepageService {
  constructor(
    private readonly homepageRepo: HomepageRepository,
    private readonly redis: RedisService,
  ) {}

  async getTopViewed(limit: number) {
    return this.cached('homepage:top-viewed', 420, () =>
      this.homepageRepo.findComics(PUBLIC_COMIC_STATUSES, { stats: { view_count: 'desc' } }, limit),
    );
  }

  async getPopular(limit: number) {
    return this.cached('homepage:popular', 1200, () =>
      this.homepageRepo.findComics(PUBLIC_COMIC_STATUSES, { stats: { follow_count: 'desc' } }, limit),
    );
  }

  async getNewest(limit: number) {
    return this.cached('homepage:newest', 120, () =>
      this.homepageRepo.findComics(PUBLIC_COMIC_STATUSES, { created_at: 'desc' }, limit),
    );
  }

  async getRecentlyUpdated(limit: number) {
    return this.cached('homepage:recently-updated', 120, () =>
      this.homepageRepo.findComics(PUBLIC_COMIC_STATUSES, { last_chapter_updated_at: 'desc' }, limit),
    );
  }

  async getCategories() {
    return this.cached('homepage:categories', 600, () =>
      this.homepageRepo.findCategories(),
    );
  }

  private async cached<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
    if (this.redis.isEnabled()) {
      const cached = await this.redis.get(`comic:cache:${key}`);
      if (cached) return JSON.parse(cached);
    }

    const result = await fn();

    if (this.redis.isEnabled()) {
      await this.redis.set(
        `comic:cache:${key}`,
        JSON.stringify(result, (_, v) => (typeof v === 'bigint' ? String(v) : v)),
        ttl,
      );
    }

    return result;
  }
}
