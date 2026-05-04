import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { ChapterRepository } from '../../repositories/chapter.repository';

@Injectable()
export class PublicChapterService {
  constructor(
    private readonly chapterRepo: ChapterRepository,
    private readonly redis: RedisService,
  ) {}

  async getOne(id: any) {
    const cacheKey = `comic:public:chapter:${id}`;
    const cached = await this.cacheGet(cacheKey);
    if (cached) return cached;

    const chapter = await this.chapterRepo.findPublicOne(id);
    if (!chapter) throw new NotFoundException('Chapter not found');

    await this.cacheSet(cacheKey, chapter, 120);
    return chapter;
  }

  async getPages(id: any) {
    const cacheKey = `comic:public:pages:${id}`;
    const cached = await this.cacheGet(cacheKey);
    if (cached) return cached;

    const chapter = await this.chapterRepo.findPublicOne(id);
    if (!chapter) throw new NotFoundException('Chapter not found');

    const pages = await this.chapterRepo.findPages(id);
    const result = { data: pages };

    await this.cacheSet(cacheKey, result, 300);
    return result;
  }

  async getNext(id: any) {
    const cacheKey = `comic:public:chapternav:${id}:next`;
    const cached = await this.cacheGetRaw(cacheKey);
    if (cached !== null) return JSON.parse(cached);

    const current = await this.chapterRepo.findById(id);
    if (!current) throw new NotFoundException('Chapter not found');
    const result = (await this.chapterRepo.findPublishedNeighbor(current.comic_id, current.chapter_index, 'next')) || null;

    await this.cacheSet(cacheKey, result, 300);
    return result;
  }

  async getPrev(id: any) {
    const cacheKey = `comic:public:chapternav:${id}:prev`;
    const cached = await this.cacheGetRaw(cacheKey);
    if (cached !== null) return JSON.parse(cached);

    const current = await this.chapterRepo.findById(id);
    if (!current) throw new NotFoundException('Chapter not found');
    const result = (await this.chapterRepo.findPublishedNeighbor(current.comic_id, current.chapter_index, 'prev')) || null;

    await this.cacheSet(cacheKey, result, 300);
    return result;
  }

  private async cacheGet(key: string): Promise<any | null> {
    try {
      if (!this.redis.isEnabled()) return null;
      const raw = await this.redis.get(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  /** Returns the raw cached string so callers can distinguish "cached null" from "cache miss". */
  private async cacheGetRaw(key: string): Promise<string | null> {
    try {
      if (!this.redis.isEnabled()) return null;
      return await this.redis.get(key);
    } catch {
      return null;
    }
  }

  private async cacheSet(key: string, value: any, ttl: number): Promise<void> {
    try {
      if (!this.redis.isEnabled()) return;
      await this.redis.set(
        key,
        JSON.stringify(value, (_, v) => (typeof v === 'bigint' ? Number(v) : v)),
        ttl,
      );
    } catch {
      // silent — cache failure must not break the endpoint
    }
  }
}
