import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { UpdateChapterDto } from '../dtos/update-chapter.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../../database/prisma.service';
import { ChapterFilter, ChapterRepository } from '../../repositories/chapter.repository';

@Injectable()
export class AdminChapterService {
  constructor(
    private readonly chapterRepo: ChapterRepository,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
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

    return this.getOne(id);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.chapterRepo.delete(id);
    return { success: true };
  }

  /**
   * Atomic publish: update last_chapter_id and emit the outbox event in
   * one transaction. Previously these were 3 separate Prisma calls — a
   * crash between them committed the chapter as published without ever
   * emitting `comic.chapter.published`, so notification fan-out missed.
   *
   * IDs are stringified in the payload because BigInt > 2^53 silently
   * corrupts when narrowed to Number (was using `Number(comic.id)`).
   */
  private async handlePublish(chapter: any) {
    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    await this.prisma.$transaction(async (tx) => {
      // Only promote `last_chapter_id` when this chapter is actually the
      // newest published one (handles re-publish of an older chapter).
      const max = await tx.chapter.aggregate({
        where: { comic_id: chapter.comic_id, status: 'published' },
        _max: { chapter_index: true },
      });
      const isLatest =
        max._max.chapter_index == null ||
        chapter.chapter_index >= max._max.chapter_index;
      if (isLatest) {
        await tx.comic.update({
          where: { id: chapter.comic_id },
          data: { last_chapter_id: chapter.id, last_chapter_updated_at: new Date() },
        });
      }

      if (!kafkaEnabled) return;

      const comic = await tx.comic.findUnique({
        where: { id: chapter.comic_id },
        select: { id: true, title: true, slug: true },
      });
      if (!comic) return;

      await tx.outbox.create({
        data: {
          event_type: 'comic.chapter.published',
          payload: {
            comic_id: String(comic.id),
            comic_title: comic.title,
            comic_slug: comic.slug,
            chapter_id: String(chapter.id),
            chapter_index: chapter.chapter_index,
            chapter_label: chapter.chapter_label || `Chapter ${chapter.chapter_index}`,
            published_at: new Date().toISOString(),
          },
        },
      });
    });
  }
}
