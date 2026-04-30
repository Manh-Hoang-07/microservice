import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ReadingHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ReadingHistoryWhereInput, options: { skip: number; take: number }) {
    return this.prisma.readingHistory.findMany({
      where,
      include: {
        comic: { select: { id: true, title: true, slug: true, cover_image: true } },
        chapter: { select: { id: true, title: true, chapter_index: true, chapter_label: true } },
      },
      orderBy: { updated_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.ReadingHistoryWhereInput) {
    return this.prisma.readingHistory.count({ where });
  }

  upsert(userId: PrimaryKey, comicId: PrimaryKey, chapterId: PrimaryKey) {
    return this.prisma.readingHistory.upsert({
      where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
      create: { user_id: userId, comic_id: comicId, chapter_id: chapterId },
      update: { chapter_id: chapterId },
    });
  }

  deleteMany(where: Prisma.ReadingHistoryWhereInput) {
    return this.prisma.readingHistory.deleteMany({ where });
  }
}
