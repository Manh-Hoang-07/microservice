import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { UpdateChapterDto } from '../dtos/update-chapter.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ChapterRepository } from '../../repositories/chapter.repository';

@Injectable()
export class AdminChapterService {
  constructor(
    private readonly chapterRepo: ChapterRepository,
    private readonly config: ConfigService,
  ) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.chapterRepo.findMany(where, options),
      this.chapterRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getSimpleList(query: any) {
    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);

    const data = await this.chapterRepo.findSimpleMany(where, 100);
    return { data };
  }

  async getOne(id: PrimaryKey) {
    const chapter = await this.chapterRepo.findById(id);
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async create(dto: CreateChapterDto) {
    const existing = await this.chapterRepo.findFirst({
      comic_id: BigInt(dto.comic_id),
      chapter_index: dto.chapter_index,
    });
    if (existing) throw new BadRequestException('Chapter index already exists for this comic');

    const chapter = await this.chapterRepo.create({
      comic_id: BigInt(dto.comic_id),
      team_id: dto.team_id ? BigInt(dto.team_id) : null,
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

  async update(id: PrimaryKey, dto: UpdateChapterDto) {
    const existing = await this.getOne(id);

    const data: any = {};
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
            chapter_id: id,
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

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.chapterRepo.delete(id);
    return { success: true };
  }

  private async handlePublish(chapter: any) {
    await this.chapterRepo.updateComicLastChapter(chapter.comic_id, chapter.id);

    const kafkaEnabled = this.config.get<boolean>('kafka.enabled');
    if (kafkaEnabled) {
      const comic = await this.chapterRepo.findComicBasic(chapter.comic_id);
      if (comic) {
        await this.chapterRepo.createOutbox({
          event_type: 'comic.chapter.published',
          payload: {
            comic_id: Number(comic.id),
            comic_title: comic.title,
            comic_slug: comic.slug,
            chapter_id: Number(chapter.id),
            chapter_index: chapter.chapter_index,
            chapter_label: chapter.chapter_label || `Chapter ${chapter.chapter_index}`,
            published_at: new Date().toISOString(),
          },
        });
      }
    }
  }
}
