import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class BookmarkRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.BookmarkWhereInput, options: { skip: number; take: number }) {
    return this.prisma.bookmark.findMany({
      where,
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

  count(where: Prisma.BookmarkWhereInput) {
    return this.prisma.bookmark.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.bookmark.findUnique({ where: { id } });
  }

  create(data: { user_id: PrimaryKey; chapter_id: PrimaryKey; page_number?: number | null }) {
    return this.prisma.bookmark.create({ data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.bookmark.delete({ where: { id } });
  }
}
