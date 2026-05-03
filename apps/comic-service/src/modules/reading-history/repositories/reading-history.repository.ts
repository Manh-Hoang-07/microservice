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

  /**
   * Track furthest chapter a user has read for a comic. Two parallel reads
   * of different chapters used to race — the loser by SQL order overwrote
   * the winner. We compare `chapter_index` inside a transaction so the
   * pointer only moves forward (or stays put on re-reads of earlier
   * chapters).
   */
  async upsert(userId: any, comicId: any, chapterId: any) {
    const uid = toPrimaryKey(userId);
    const cid = toPrimaryKey(comicId);
    const chid = toPrimaryKey(chapterId);

    return this.prisma.$transaction(async (tx) => {
      const incoming = await tx.chapter.findUnique({
        where: { id: chid },
        select: { chapter_index: true, comic_id: true },
      });
      if (!incoming || incoming.comic_id !== cid) {
        throw new Error('Chapter does not belong to comic');
      }

      const existing = await tx.readingHistory.findUnique({
        where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
        include: { chapter: { select: { chapter_index: true } } },
      });

      if (!existing) {
        return tx.readingHistory.create({
          data: { user_id: uid, comic_id: cid, chapter_id: chid },
        });
      }

      if (existing.chapter_id === chid) {
        return tx.readingHistory.update({
          where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
          data: { updated_at: new Date() },
        });
      }

      const incomingIdx = incoming.chapter_index ?? 0;
      const existingIdx = existing.chapter?.chapter_index ?? 0;
      if (incomingIdx >= existingIdx) {
        return tx.readingHistory.update({
          where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
          data: { chapter_id: chid },
        });
      }
      return existing;
    });
  }

  deleteByUserComic(filter: ReadingHistoryFilter) {
    return this.prisma.readingHistory.deleteMany({ where: this.buildWhere(filter) });
  }
}
