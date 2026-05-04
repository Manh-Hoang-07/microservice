import { Injectable, Logger, NotFoundException, BadRequestException, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@package/redis';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { UpdateChapterDto } from '../dtos/update-chapter.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { ChapterFilter, ChapterRepository } from '../../repositories/chapter.repository';

@Injectable()
export class AdminChapterService {
  private readonly logger = new Logger(AdminChapterService.name);

  constructor(
    private readonly chapterRepo: ChapterRepository,
    private readonly config: ConfigService,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ChapterFilter = {};
    if (query.comic_id) filter.comic_id = query.comic_id;
    if (query.status) filter.status = query.status;
    if (query.team_id) filter.team_id = query.team_id;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.chapterRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.chapterRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getSimpleList(query: any = {}) {
    const filter: ChapterFilter = {};
    if (query.comic_id) filter.comic_id = query.comic_id;

    const data = await this.chapterRepo.findSimpleMany(filter, 100);
    return { data };
  }

  async getOne(id: any) {
    const chapter = await this.chapterRepo.findById(id);
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async create(dto: CreateChapterDto) {
    const existing = await this.chapterRepo.findByIndex(dto.comic_id, dto.chapter_index);
    if (existing) throw new BadRequestException('Chapter index already exists for this comic');

    const chapter = await this.chapterRepo.create({
      comic_id: dto.comic_id,
      team_id: dto.team_id ?? null,
      title: dto.title,
      chapter_index: dto.chapter_index,
      chapter_label: dto.chapter_label,
      status: dto.status || 'draft',
    });

    if (dto.pages?.length) {
      await this.chapterRepo.createPages(
        dto.pages.map((p, i) => ({
          chapter_id: chapter.id,
          page_number: i + 1,
          image_url: p.image_url,
          width: p.width,
          height: p.height,
          file_size: p.file_size ? BigInt(p.file_size) : null,
        })),
      );
    }

    if (chapter.status === 'published') {
      await this.handlePublish(chapter);
    }

    await this.clearChapterCaches(chapter.id, dto.comic_id);
    return this.getOne(chapter.id);
  }

  async update(id: any, dto: UpdateChapterDto) {
    const existing = await this.getOne(id);

    const data: Record<string, any> = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.chapter_index !== undefined) data.chapter_index = dto.chapter_index;
    if (dto.chapter_label !== undefined) data.chapter_label = dto.chapter_label;
    if (dto.status !== undefined) data.status = dto.status;

    const chapter = await this.chapterRepo.update(id, data);

    if (dto.pages !== undefined) {
      await this.chapterRepo.deletePages(id);
      if (dto.pages.length) {
        await this.chapterRepo.createPages(
          dto.pages.map((p, i) => ({
            chapter_id: toPrimaryKey(id),
            page_number: i + 1,
            image_url: p.image_url,
            width: p.width,
            height: p.height,
            file_size: p.file_size ? BigInt(p.file_size) : null,
          })),
        );
      }
    }

    if (dto.status === 'published' && existing.status !== 'published') {
      await this.handlePublish(chapter);
    }

    await this.clearChapterCaches(id, existing.comic_id);
    return this.getOne(id);
  }

  async delete(id: any) {
    const chapter = await this.getOne(id);
    await this.chapterRepo.delete(id);
    await this.clearChapterCaches(id, chapter.comic_id);
    return { success: true };
  }

  private async clearChapterCaches(chapterId: any, comicId?: any): Promise<void> {
    try {
      await this.redis?.del(`comic:public:chapter:${chapterId}`);
      await this.redis?.del(`comic:public:pages:${chapterId}`);
      if (comicId) {
        const chapterListKeys = await this.redis?.keys(`comic:public:chapters:${comicId}:*`);
        if (chapterListKeys?.length) await this.redis?.deleteMany(chapterListKeys);
      }
      const navKeys = await this.redis?.keys('comic:public:nav:*');
      if (navKeys?.length) await this.redis?.deleteMany(navKeys);
      // Clear homepage recently-updated cache
      await this.redis?.del('comic:cache:homepage:recently-updated');
    } catch (err) {
      this.logger.warn('Failed to clear chapter caches', (err as Error).message);
    }
  }

  private async handlePublish(chapter: any) {
    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    await this.chapterRepo.withTransaction(async (tx) => {
      await this.chapterRepo.updateComicLastChapterIfLatest(
        chapter.comic_id,
        chapter.id,
        chapter.chapter_index,
        tx,
      );

      if (!kafkaEnabled) return;

      const comic = await this.chapterRepo.findComicBasic(chapter.comic_id, tx);
      if (!comic) return;

      await this.chapterRepo.createOutbox(
        'comic.chapter.published',
        {
          comic_id: String(comic.id),
          comic_title: comic.title,
          comic_slug: comic.slug,
          chapter_id: String(chapter.id),
          chapter_index: chapter.chapter_index,
          chapter_label: chapter.chapter_label || `Chapter ${chapter.chapter_index}`,
          published_at: new Date().toISOString(),
        },
        tx,
      );
    });
  }
}
