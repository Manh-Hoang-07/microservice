import { Injectable } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class StatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertStats(postId: PrimaryKey, count: number) {
    return this.prisma.stats.upsert({
      where: { post_id: postId },
      create: { post_id: postId, view_count: BigInt(count) },
      update: { view_count: { increment: BigInt(count) } },
    });
  }

  upsertDailyStats(postId: PrimaryKey, date: Date, count: number) {
    return this.prisma.dailyStats.upsert({
      where: { post_id_stat_date: { post_id: postId, stat_date: date } },
      create: { post_id: postId, stat_date: date, view_count: BigInt(count) },
      update: { view_count: { increment: BigInt(count) } },
    });
  }
}
