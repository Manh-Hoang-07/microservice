import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ViewTrackingRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertStats(comicId: bigint, count: number) {
    return this.prisma.comicStats.upsert({
      where: { comic_id: comicId },
      create: { comic_id: comicId, view_count: BigInt(count) },
      update: { view_count: { increment: BigInt(count) } },
    });
  }

  upsertDailyStats(comicId: bigint, date: Date, count: number) {
    return this.prisma.comicDailyStats.upsert({
      where: { comic_id_stat_date: { comic_id: comicId, stat_date: date } },
      create: { comic_id: comicId, stat_date: date, view_count: BigInt(count) },
      update: { view_count: { increment: BigInt(count) } },
    });
  }
}
