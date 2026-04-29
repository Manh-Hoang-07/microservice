import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { UpdateChapterDto } from '../dtos/update-chapter.dto';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class AdminChapterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.prisma.chapter.findMany({
        where,
        include: { pages: { orderBy: { page_number: 'asc' } } },
        orderBy: { chapter_index: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.chapter.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getSimpleList(query: any) {
    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);

    const data = await this.prisma.chapter.findMany({
      where,
      select: { id: true, title: true, chapter_index: true, chapter_label: true, status: true },
      orderBy: { chapter_index: 'desc' },
      take: 100,
    });

    return { data };
  }

  async getOne(id: bigint) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id },
      include: { pages: { orderBy: { page_number: 'asc' } } },
    });
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async create(dto: CreateChapterDto) {
    // Validate unique chapter_index per comic
    const existing = await this.prisma.chapter.findFirst({
      where: { comic_id: BigInt(dto.comic_id), chapter_index: dto.chapter_index },
    });
    if (existing) throw new BadRequestException('Chapter index already exists for this comic');

    const chapter = await this.prisma.chapter.create({
      data: {
        comic_id: BigInt(dto.comic_id),
        team_id: dto.team_id ? BigInt(dto.team_id) : null,
        title: dto.title,
        chapter_index: dto.chapter_index,
        chapter_label: dto.chapter_label,
        status: dto.status || 'draft',
      },
    });

    // Create pages if provided
    if (dto.pages?.length) {
      await this.prisma.chapterPage.createMany({
        data: dto.pages.map((p, i) => ({
          chapter_id: chapter.id,
          page_number: i + 1,
          image_url: p.image_url,
          width: p.width,
          height: p.height,
          file_size: p.file_size ? BigInt(p.file_size) : null,
        })),
      });
    }

    // If publishing, update comic last_chapter info and write outbox
    if (chapter.status === 'published') {
      await this.handlePublish(chapter);
    }

    return this.getOne(chapter.id);
  }

  async update(id: bigint, dto: UpdateChapterDto) {
    const existing = await this.getOne(id);

    const data: any = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.chapter_index !== undefined) data.chapter_index = dto.chapter_index;
    if (dto.chapter_label !== undefined) data.chapter_label = dto.chapter_label;
    if (dto.status !== undefined) data.status = dto.status;

    const chapter = await this.prisma.chapter.update({ where: { id }, data });

    // Sync pages if provided
    if (dto.pages !== undefined) {
      await this.prisma.chapterPage.deleteMany({ where: { chapter_id: id } });
      if (dto.pages.length) {
        await this.prisma.chapterPage.createMany({
          data: dto.pages.map((p, i) => ({
            chapter_id: id,
            page_number: i + 1,
            image_url: p.image_url,
            width: p.width,
            height: p.height,
            file_size: p.file_size ? BigInt(p.file_size) : null,
          })),
        });
      }
    }

    // If status changed to published
    if (dto.status === 'published' && existing.status !== 'published') {
      await this.handlePublish(chapter);
    }

    return this.getOne(id);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.chapter.delete({ where: { id } });
    return { success: true };
  }

  private async handlePublish(chapter: any) {
    // Update comic last_chapter info
    await this.prisma.comic.update({
      where: { id: chapter.comic_id },
      data: {
        last_chapter_id: chapter.id,
        last_chapter_updated_at: new Date(),
      },
    });

    // Get comic info for outbox event
    const comic = await this.prisma.comic.findUnique({
      where: { id: chapter.comic_id },
      select: { id: true, title: true, slug: true },
    });

    // Write to outbox for Kafka
    const kafkaEnabled = this.config.get<boolean>('kafka.enabled');
    if (kafkaEnabled && comic) {
      await this.prisma.comicOutbox.create({
        data: {
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
        },
      });
    }
  }
}
