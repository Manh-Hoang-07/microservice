import { Injectable } from '@nestjs/common';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ViewTrackingRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertStats(comicId: any, count: number) {
    const cid = toPrimaryKey(comicId);
    return this.prisma.stats.upsert({
      where: { comic_id: cid },
      create: { comic_id: cid, view_count: BigInt(count) },
      update: { view_count: { increment: BigInt(count) } },
    });
  }

  upsertDailyStats(comicId: any, date: Date, count: number) {
    const cid = toPrimaryKey(comicId);
    return this.prisma.dailyStats.upsert({
      where: { comic_id_stat_date: { comic_id: cid, stat_date: date } },
      create: { comic_id: cid, stat_date: date, view_count: BigInt(count) },
      update: { view_count: { increment: BigInt(count) } },
    });
  }
}
