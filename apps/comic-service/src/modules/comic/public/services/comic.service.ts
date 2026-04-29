import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { RedisService } from '@package/redis';
import { PUBLIC_COMIC_STATUSES } from '../../../../common/enums';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class PublicComicService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: { in: PUBLIC_COMIC_STATUSES } };
    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { slug: { contains: query.search } },
        { author: { contains: query.search } },
      ];
    }
    if (query.comic_category_id) {
      where.categoryLinks = {
        some: { comic_category_id: BigInt(query.comic_category_id) },
      };
    }
    if (query.is_featured !== undefined) {
      where.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }

    // Parse sort
    let orderBy: any = { updated_at: 'desc' };
    if (query.sort) {
      const [field, dir] = query.sort.split(':');
      if (['view_count', 'follow_count', 'rating_count'].includes(field)) {
        orderBy = { stats: { [field]: dir || 'desc' } };
      } else {
        orderBy = { [field]: dir || 'desc' };
      }
    }

    const select = {
      id: true,
      slug: true,
      title: true,
      description: true,
      cover_image: true,
      author: true,
      status: true,
      created_at: true,
      updated_at: true,
      last_chapter_id: true,
      last_chapter_updated_at: true,
      is_featured: true,
      stats: true,
      categoryLinks: {
        select: { category: { select: { id: true, name: true, slug: true } } },
      },
      chapters: {
        where: { status: 'published' as const },
        orderBy: { chapter_index: 'desc' as const },
        take: 1,
        select: {
          id: true,
          title: true,
          chapter_index: true,
          chapter_label: true,
          created_at: true,
        },
      },
    };

    const [data, total] = await Promise.all([
      this.prisma.comic.findMany({ where, select, orderBy, skip, take: limit }),
      this.prisma.comic.count({ where }),
    ]);

    return {
      data: data.map((c) => this.transform(c)),
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async getBySlug(slug: string) {
    const comic = await this.prisma.comic.findFirst({
      where: { slug, status: { in: PUBLIC_COMIC_STATUSES } },
      include: {
        stats: true,
        categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
        chapters: {
          where: { status: 'published' },
          orderBy: { chapter_index: 'desc' },
          take: 1,
          select: { id: true, title: true, chapter_index: true, chapter_label: true, created_at: true },
        },
      },
    });
    if (!comic) throw new NotFoundException('Comic not found');
    return this.transform(comic);
  }

  async getChaptersBySlug(slug: string, options: any = {}) {
    const comic = await this.prisma.comic.findFirst({
      where: { slug, status: { in: PUBLIC_COMIC_STATUSES } },
      select: { id: true },
    });
    if (!comic) throw new NotFoundException('Comic not found');

    // Increment view via Redis buffer
    if (this.redis.isEnabled()) {
      await this.redis.hincrby('comic:views:buffer', comic.id.toString(), 1);
    }

    const page = Math.max(Number(options.page) || 1, 1);
    const limit = Math.max(Number(options.limit) || 10000, 1);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.chapter.findMany({
        where: { comic_id: comic.id, status: 'published' },
        select: {
          id: true,
          comic_id: true,
          title: true,
          chapter_index: true,
          chapter_label: true,
          status: true,
          view_count: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: { chapter_index: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.chapter.count({
        where: { comic_id: comic.id, status: 'published' },
      }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  private transform(entity: any) {
    if (!entity) return null;
    const item = { ...entity };

    if (item.categoryLinks && Array.isArray(item.categoryLinks)) {
      item.categories = item.categoryLinks.map((l: any) => l?.category).filter(Boolean);
      delete item.categoryLinks;
    }

    if (item.chapters && Array.isArray(item.chapters)) {
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
