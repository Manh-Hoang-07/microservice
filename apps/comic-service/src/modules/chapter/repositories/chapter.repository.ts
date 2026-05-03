import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface ChapterFilter {
  comic_id?: any;
  status?: string;
  team_id?: any;
}

const WITH_PAGES = {
  pages: { orderBy: { page_number: 'asc' as const } },
} as const;

const SIMPLE_SELECT = {
  id: true,
  title: true,
  chapter_index: true,
  chapter_label: true,
  status: true,
} as const;

@Injectable()
export class ChapterRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: ChapterFilter): Prisma.ChapterWhereInput {
    const where: Prisma.ChapterWhereInput = {};
    if (filter.comic_id !== undefined) where.comic_id = toPrimaryKey(filter.comic_id);
    if (filter.team_id !== undefined) where.team_id = toPrimaryKey(filter.team_id);
    if (filter.status) where.status = filter.status;
    return where;
  }

  findMany(filter: ChapterFilter, options: { skip: number; take: number }) {
    return this.prisma.chapter.findMany({
      where: this.buildWhere(filter),
      include: WITH_PAGES,
      orderBy: { chapter_index: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findSimpleMany(filter: ChapterFilter, take: number) {
    return this.prisma.chapter.findMany({
      where: this.buildWhere(filter),
      select: SIMPLE_SELECT,
      orderBy: { chapter_index: 'desc' },
      take,
    });
  }

  count(filter: ChapterFilter) {
    return this.prisma.chapter.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.chapter.findUnique({
      where: { id: toPrimaryKey(id) },
      include: WITH_PAGES,
    });
  }

  findByIndex(comicId: any, chapterIndex: number) {
    return this.prisma.chapter.findUnique({
      where: {
        comic_id_chapter_index: {
          comic_id: toPrimaryKey(comicId),
          chapter_index: chapterIndex,
        },
      },
    });
  }

  findPublicOne(id: any) {
    return this.prisma.chapter.findFirst({
      where: { id: toPrimaryKey(id), status: 'published' },
      include: {
        pages: { orderBy: { page_number: 'asc' } },
        comic: { select: { id: true, title: true, slug: true } },
      },
    });
  }

  findPages(chapterId: any) {
    return this.prisma.page.findMany({
      where: { chapter_id: toPrimaryKey(chapterId) },
      orderBy: { page_number: 'asc' },
    });
  }

  findPublishedNeighbor(comicId: any, currentIndex: number, direction: 'next' | 'prev') {
    return this.prisma.chapter.findFirst({
      where: {
        comic_id: toPrimaryKey(comicId),
        chapter_index: direction === 'next' ? { gt: currentIndex } : { lt: currentIndex },
        status: 'published',
      },
      orderBy: { chapter_index: direction === 'next' ? 'asc' : 'desc' },
      select: { id: true, title: true, chapter_index: true, chapter_label: true },
    });
  }

  create(data: Record<string, any>) {
    return this.prisma.chapter.create({
      data: this.normalizePayload(data) as Prisma.ChapterUncheckedCreateInput,
    });
  }

  createPages(pages: Prisma.PageCreateManyInput[]) {
    return this.prisma.page.createMany({ data: pages });
  }

  deletePages(chapterId: any) {
    return this.prisma.page.deleteMany({ where: { chapter_id: toPrimaryKey(chapterId) } });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.chapter.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.ChapterUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.chapter.delete({ where: { id: toPrimaryKey(id) } });
  }

  /**
   * Update `last_chapter_id` only when the new chapter is genuinely the
   * latest. Without the `chapter_index` guard, re-publishing an old chapter
   * (e.g. fixing typos in chapter 1) overwrote the pointer with the wrong
   * chapter and the homepage "latest update" went backwards.
   */
  async updateComicLastChapter(comicId: any, chapterId: any) {
    const cid = toPrimaryKey(comicId);
    const chid = toPrimaryKey(chapterId);
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chid },
      select: { chapter_index: true },
    });
    if (!chapter) return null;

    const max = await this.prisma.chapter.aggregate({
      where: { comic_id: cid, status: 'published' },
      _max: { chapter_index: true },
    });

    const isLatest =
      max._max.chapter_index == null ||
      chapter.chapter_index >= max._max.chapter_index;
    if (!isLatest) return null;

    return this.prisma.comic.update({
      where: { id: cid },
      data: { last_chapter_id: chid, last_chapter_updated_at: new Date() },
    });
  }

  findComicBasic(comicId: any) {
    return this.prisma.comic.findUnique({
      where: { id: toPrimaryKey(comicId) },
      select: { id: true, title: true, slug: true },
    });
  }

  createOutbox(event_type: string, payload: Record<string, any>) {
    return this.prisma.outbox.create({ data: { event_type, payload } });
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    delete payload.pages;
    const bigIntFields = ['comic_id', 'team_id', 'created_user_id', 'updated_user_id', 'group_id'];
    for (const field of bigIntFields) {
      const value = payload[field];
      if (value === undefined) continue;
      payload[field] = value === null || value === '' ? null : toPrimaryKey(value);
    }
    return payload;
  }
}
