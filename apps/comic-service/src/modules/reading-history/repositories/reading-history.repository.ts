import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface ReadingHistoryFilter {
  user_id?: any;
  comic_id?: any;
}

@Injectable()
export class ReadingHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: ReadingHistoryFilter): Prisma.ReadingHistoryWhereInput {
    const where: Prisma.ReadingHistoryWhereInput = {};
    if (filter.user_id !== undefined) where.user_id = toPrimaryKey(filter.user_id);
    if (filter.comic_id !== undefined) where.comic_id = toPrimaryKey(filter.comic_id);
    return where;
  }

  findMany(filter: ReadingHistoryFilter, options: { skip: number; take: number }) {
    return this.prisma.readingHistory.findMany({
      where: this.buildWhere(filter),
      include: {
        comic: { select: { id: true, title: true, slug: true, cover_image: true } },
        chapter: { select: { id: true, title: true, chapter_index: true, chapter_label: true } },
      },
      orderBy: { updated_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: ReadingHistoryFilter) {
    return this.prisma.readingHistory.count({ where: this.buildWhere(filter) });
  }

  upsert(userId: any, comicId: any, chapterId: any) {
    const uid = toPrimaryKey(userId);
    const cid = toPrimaryKey(comicId);
    const chid = toPrimaryKey(chapterId);
    return this.prisma.readingHistory.upsert({
      where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
      create: { user_id: uid, comic_id: cid, chapter_id: chid },
      update: { chapter_id: chid },
    });
  }

  deleteByUserComic(filter: ReadingHistoryFilter) {
    return this.prisma.readingHistory.deleteMany({ where: this.buildWhere(filter) });
  }
}
