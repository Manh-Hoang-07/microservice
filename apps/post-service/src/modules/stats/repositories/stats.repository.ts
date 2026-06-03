import { Injectable } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class StatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertStats(postId: PrimaryKey, count: number) {
    return this.prisma.stats.upsert({
      where: { postId: postId },
      create: { postId: postId, viewCount: BigInt(count) },
      update: { viewCount: { increment: BigInt(count) } },
    });
  }

  upsertDailyStats(postId: PrimaryKey, date: Date, count: number) {
    return this.prisma.dailyStats.upsert({
      where: { postId_statDate: { postId: postId, statDate: date } },
      create: { postId: postId, statDate: date, viewCount: BigInt(count) },
      update: { viewCount: { increment: BigInt(count) } },
    });
  }

  async getOverview() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const last7 = new Date(today);
    last7.setDate(today.getDate() - 6);
    const last30 = new Date(today);
    last30.setDate(today.getDate() - 29);

    const [postGroups, totalAgg, todayAgg, last7Agg, last30Agg] = await Promise.all([
      this.prisma.post.groupBy({ by: ['status'], _count: { _all: true } }),
      this.prisma.stats.aggregate({ _sum: { viewCount: true } }),
      this.prisma.dailyStats.aggregate({ _sum: { viewCount: true }, where: { statDate: { gte: today } } }),
      this.prisma.dailyStats.aggregate({ _sum: { viewCount: true }, where: { statDate: { gte: last7 } } }),
      this.prisma.dailyStats.aggregate({ _sum: { viewCount: true }, where: { statDate: { gte: last30 } } }),
    ]);

    const postCounts: Record<string, number> = { total: 0 };
    for (const g of postGroups) {
      postCounts[g.status] = g._count._all;
      postCounts['total'] += g._count._all;
    }

    return {
      postCounts,
      totalViews: totalAgg._sum.viewCount ?? BigInt(0),
      viewsToday: todayAgg._sum.viewCount ?? BigInt(0),
      viewsLast7Days: last7Agg._sum.viewCount ?? BigInt(0),
      viewsLast30Days: last30Agg._sum.viewCount ?? BigInt(0),
    };
  }

  getPostStats(postId: PrimaryKey) {
    return this.prisma.stats.findUnique({ where: { postId } });
  }

  getDailyStatsForPost(postId: PrimaryKey, startDate: Date, endDate: Date) {
    return this.prisma.dailyStats.findMany({
      where: { postId, statDate: { gte: startDate, lte: endDate } },
      orderBy: { statDate: 'asc' },
      select: { statDate: true, viewCount: true },
    });
  }
}
