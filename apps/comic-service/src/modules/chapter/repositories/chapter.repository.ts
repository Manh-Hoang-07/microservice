import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class ChapterRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ChapterWhereInput, options: { skip: number; take: number }) {
    return this.prisma.chapter.findMany({
      where,
      include: { pages: { orderBy: { page_number: 'asc' } } },
      orderBy: { chapter_index: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findSimpleMany(where: Prisma.ChapterWhereInput, take: number) {
    return this.prisma.chapter.findMany({
      where,
      select: { id: true, title: true, chapter_index: true, chapter_label: true, status: true },
      orderBy: { chapter_index: 'desc' },
      take,
    });
  }

  count(where: Prisma.ChapterWhereInput) {
    return this.prisma.chapter.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.chapter.findUnique({
      where: { id },
      include: { pages: { orderBy: { page_number: 'asc' } } },
    });
  }

  findFirst(where: Prisma.ChapterWhereInput) {
    return this.prisma.chapter.findFirst({ where });
  }

  findPublicOne(id: PrimaryKey) {
    return this.prisma.chapter.findFirst({
      where: { id, status: 'published' },
      include: {
        pages: { orderBy: { page_number: 'asc' } },
        comic: { select: { id: true, title: true, slug: true } },
      },
    });
  }

  findPages(chapterId: PrimaryKey) {
    return this.prisma.chapterPage.findMany({
      where: { chapter_id: chapterId },
      orderBy: { page_number: 'asc' },
    });
  }

  findNextChapter(comicId: PrimaryKey, currentIndex: number) {
    return this.prisma.chapter.findFirst({
      where: { comic_id: comicId, chapter_index: { gt: currentIndex }, status: 'published' },
      orderBy: { chapter_index: 'asc' },
      select: { id: true, title: true, chapter_index: true, chapter_label: true },
    });
  }

  findPrevChapter(comicId: PrimaryKey, currentIndex: number) {
    return this.prisma.chapter.findFirst({
      where: { comic_id: comicId, chapter_index: { lt: currentIndex }, status: 'published' },
      orderBy: { chapter_index: 'desc' },
      select: { id: true, title: true, chapter_index: true, chapter_label: true },
    });
  }

  create(data: Prisma.ChapterUncheckedCreateInput) {
    return this.prisma.chapter.create({ data });
  }

  createPages(pages: Prisma.ChapterPageCreateManyInput[]) {
    return this.prisma.chapterPage.createMany({ data: pages });
  }

  deletePages(chapterId: PrimaryKey) {
    return this.prisma.chapterPage.deleteMany({ where: { chapter_id: chapterId } });
  }

  update(id: PrimaryKey, data: Prisma.ChapterUpdateInput) {
    return this.prisma.chapter.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.chapter.delete({ where: { id } });
  }

  updateComicLastChapter(comicId: PrimaryKey, chapterId: PrimaryKey) {
    return this.prisma.comic.update({
      where: { id: comicId },
      data: { last_chapter_id: chapterId, last_chapter_updated_at: new Date() },
    });
  }

  findComicBasic(comicId: PrimaryKey) {
    return this.prisma.comic.findUnique({
      where: { id: comicId },
      select: { id: true, title: true, slug: true },
    });
  }

  createOutbox(data: Prisma.ComicOutboxCreateInput) {
    return this.prisma.comicOutbox.create({ data });
  }
}
