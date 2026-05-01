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

  create(data: { user_id: any; chapter_id: any; page_number: number }) {
    return this.prisma.bookmark.create({
      data: {
        user_id: toPrimaryKey(data.user_id),
        chapter_id: toPrimaryKey(data.chapter_id),
        page_number: data.page_number,
      },
    });
  }

  delete(id: any) {
    return this.prisma.bookmark.delete({ where: { id: toPrimaryKey(id) } });
  }
}
