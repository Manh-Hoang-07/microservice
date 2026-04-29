import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { PUBLIC_COMIC_STATUSES } from '../../enums/comic-status.enum';
import { createPaginationMeta } from '@package/common';
import { ComicRepository } from '../../repositories/comic.repository';

@Injectable()
export class PublicComicService {
  constructor(
    private readonly comicRepo: ComicRepository,
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

    let orderBy: any = { updated_at: 'desc' };
    if (query.sort) {
      const [field, dir] = query.sort.split(':');
      if (['view_count', 'follow_count', 'rating_count'].includes(field)) {
        orderBy = { stats: { [field]: dir || 'desc' } };
      } else {
        orderBy = { [field]: dir || 'desc' };
      }
    }

    const [data, total] = await Promise.all([
      this.comicRepo.findManyPublic(where, { skip, take: limit }, orderBy),
      this.comicRepo.count(where),
    ]);

    return {
      data: data.map((c) => this.transform(c)),
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async getBySlug(slug: string) {
    const comic = await this.comicRepo.findBySlug(slug, PUBLIC_COMIC_STATUSES);
    if (!comic) throw new NotFoundException('Comic not found');
    return this.transform(comic);
  }

  async getChaptersBySlug(slug: string, options: any = {}) {
    const comic = await this.comicRepo.findIdBySlug(slug, PUBLIC_COMIC_STATUSES);
    if (!comic) throw new NotFoundException('Comic not found');

    if (this.redis.isEnabled()) {
      await this.redis.hincrby('comic:views:buffer', comic.id.toString(), 1);
    }

    const page = Math.max(Number(options.page) || 1, 1);
    const limit = Math.max(Number(options.limit) || 10000, 1);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.comicRepo.findPublicChapters(comic.id, { skip, take: limit }),
      this.comicRepo.countPublicChapters(comic.id),
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
