import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { RedisService } from '../../../redis/redis.service';
import { PUBLIC_COMIC_STATUSES } from '../../../common/enums';

@Injectable()
export class HomepageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async getTopViewed(limit: number) {
    return this.cached('homepage:top-viewed', 420, () =>
      this.getComics({ stats: { view_count: 'desc' } }, limit),
    );
  }

  async getPopular(limit: number) {
    return this.cached('homepage:popular', 1200, () =>
      this.getComics({ stats: { follow_count: 'desc' } }, limit),
    );
  }

  async getNewest(limit: number) {
    return this.cached('homepage:newest', 120, () =>
      this.getComics({ created_at: 'desc' }, limit),
    );
  }

  async getRecentlyUpdated(limit: number) {
    return this.cached('homepage:recently-updated', 120, () =>
      this.getComics({ last_chapter_updated_at: 'desc' }, limit),
    );
  }

  async getCategories() {
    return this.cached('homepage:categories', 43200, () =>
      this.prisma.comicCategory.findMany({
        select: { id: true, name: true, slug: true },
        orderBy: { name: 'asc' },
      }),
    );
  }

  private async getComics(orderBy: any, limit: number) {
    return this.prisma.comic.findMany({
      where: { status: { in: PUBLIC_COMIC_STATUSES } },
      select: {
        id: true,
        slug: true,
        title: true,
        cover_image: true,
        author: true,
        status: true,
        last_chapter_updated_at: true,
        is_featured: true,
        stats: true,
        categoryLinks: {
          select: { category: { select: { id: true, name: true, slug: true } } },
        },
        chapters: {
          where: { status: 'published' },
          orderBy: { chapter_index: 'desc' },
          take: 1,
          select: { id: true, title: true, chapter_index: true, chapter_label: true, created_at: true },
        },
      },
      orderBy,
      take: limit,
    });
  }

  private async cached<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
    if (this.redis.isEnabled()) {
      const cached = await this.redis.get(`comic:cache:${key}`);
      if (cached) return JSON.parse(cached);
    }

    const result = await fn();

    if (this.redis.isEnabled()) {
      await this.redis.set(`comic:cache:${key}`, JSON.stringify(result, (_, v) =>
        typeof v === 'bigint' ? Number(v) : v
      ), ttl);
    }

    return result;
  }
}
