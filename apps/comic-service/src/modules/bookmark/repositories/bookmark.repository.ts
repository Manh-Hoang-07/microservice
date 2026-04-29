import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

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

  findById(id: bigint) {
    return this.prisma.bookmark.findUnique({ where: { id } });
  }

  create(data: { user_id: bigint; chapter_id: bigint; page_number?: number | null }) {
    return this.prisma.bookmark.create({ data });
  }

  delete(id: bigint) {
    return this.prisma.bookmark.delete({ where: { id } });
  }
}
