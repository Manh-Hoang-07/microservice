import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface BookmarkFilter {
  user_id?: any;
  chapter_id?: any;
}

@Injectable()
export class BookmarkRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: BookmarkFilter): Prisma.BookmarkWhereInput {
    const where: Prisma.BookmarkWhereInput = {};
    if (filter.user_id !== undefined) where.user_id = toPrimaryKey(filter.user_id);
    if (filter.chapter_id !== undefined) where.chapter_id = toPrimaryKey(filter.chapter_id);
    return where;
  }

  findMany(filter: BookmarkFilter, options: { skip: number; take: number }) {
    return this.prisma.bookmark.findMany({
      where: this.buildWhere(filter),
      include: {
        chapter: {
          select: {
            id: true,
            title: true,
            chapter_index: true,
            comic: { select: { id: true, title: true, slug: true } },
          },
        },
      },
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: BookmarkFilter) {
    return this.prisma.bookmark.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.bookmark.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  /**
   * Upsert keyed on (user_id, chapter_id, page_number). Idempotent — a
   * double-tap from the client returns the same row instead of inserting a
   * duplicate. Requires the @@unique migration on the Bookmark model.
   */
  upsert(data: { user_id: any; chapter_id: any; page_number: number }) {
    const uid = toPrimaryKey(data.user_id);
    const cid = toPrimaryKey(data.chapter_id);
    return this.prisma.bookmark.upsert({
      where: {
        user_id_chapter_id_page_number: {
          user_id: uid,
          chapter_id: cid,
          page_number: data.page_number,
        },
      },
      create: {
        user_id: uid,
        chapter_id: cid,
        page_number: data.page_number,
      },
      // No fields actually need updating — refresh `created_at` would be a
      // semantic change. Empty update is a no-op.
      update: {},
    });
  }

  delete(id: any) {
    return this.prisma.bookmark.delete({ where: { id: toPrimaryKey(id) } });
  }
}
