import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { toPrimaryKey, PrimaryKey } from 'src/types';

const COMIC_WITH_STATS = {
  stats: true,
  categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
} as const;

const PUBLIC_COMIC_SELECT = {
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
} as const;

@Injectable()
export class ComicRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ComicWhereInput, options: { skip: number; take: number }) {
    return this.prisma.comic.findMany({
      where,
      include: COMIC_WITH_STATS,
      orderBy: { updated_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(where: Prisma.ComicWhereInput, options: { skip: number; take: number }, orderBy: any) {
    return this.prisma.comic.findMany({ where, select: PUBLIC_COMIC_SELECT, orderBy, skip: options.skip, take: options.take });
  }

  findSimpleMany(where: Prisma.ComicWhereInput, take: number) {
    return this.prisma.comic.findMany({
      where,
      select: { id: true, title: true, slug: true, status: true },
      orderBy: { title: 'asc' },
      take,
    });
  }

  count(where: Prisma.ComicWhereInput) {
    return this.prisma.comic.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.comic.findUnique({ where: { id }, include: COMIC_WITH_STATS });
  }

  findBySlug(slug: string, statuses: string[]) {
    return this.prisma.comic.findFirst({
      where: { slug, status: { in: statuses } },
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
  }

  findIdBySlug(slug: string, statuses: string[]) {
    return this.prisma.comic.findFirst({
      where: { slug, status: { in: statuses } },
      select: { id: true },
    });
  }

  findFirst(where: Prisma.ComicWhereInput) {
    return this.prisma.comic.findFirst({ where });
  }

  create(data: Prisma.ComicCreateInput) {
    return this.prisma.comic.create({ data });
  }

  createStats(comicId: PrimaryKey) {
    return this.prisma.comicStats.create({ data: { comic_id: comicId } });
  }

  async syncCategories(comicId: PrimaryKey, categoryIds: number[]) {
    await this.prisma.comicCategoryOnComic.deleteMany({ where: { comic_id: comicId } });
    if (categoryIds.length > 0) {
      await this.prisma.comicCategoryOnComic.createMany({
        data: categoryIds.map((catId) => ({
          comic_id: comicId,
          comic_category_id: toPrimaryKey(catId),
        })),
      });
    }
  }

  update(id: PrimaryKey, data: Prisma.ComicUpdateInput) {
    return this.prisma.comic.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.comic.delete({ where: { id } });
  }

  findPublicChapters(comicId: PrimaryKey, options: { skip: number; take: number }) {
    return this.prisma.chapter.findMany({
      where: { comic_id: comicId, status: 'published' },
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
      skip: options.skip,
      take: options.take,
    });
  }

  countPublicChapters(comicId: PrimaryKey) {
    return this.prisma.chapter.count({ where: { comic_id: comicId, status: 'published' } });
  }
}
