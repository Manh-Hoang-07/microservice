import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';

@Injectable()
export class AdminStatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    const [totalComics, totalViews, totalFollows] = await Promise.all([
      this.prisma.comic.count(),
      this.prisma.comicStats.aggregate({ _sum: { view_count: true } }),
      this.prisma.comicStats.aggregate({ _sum: { follow_count: true } }),
    ]);

    const topComics = await this.prisma.comic.findMany({
      include: { stats: true },
      orderBy: { stats: { view_count: 'desc' } },
      take: 10,
    });

    return {
      total_comics: totalComics,
      total_views: totalViews._sum?.view_count || 0,
      total_follows: totalFollows._sum?.follow_count || 0,
      top_comics: topComics,
    };
  }

  async getTopComics(query: any) {
    const limit = Math.max(Number(query.limit) || 10, 1);
    const sortBy = query.sort_by || 'views';

    const orderBy: any =
      sortBy === 'follows'
        ? { stats: { follow_count: 'desc' } }
        : sortBy === 'rating'
          ? { stats: { rating_sum: 'desc' } }
          : { stats: { view_count: 'desc' } };

    const data = await this.prisma.comic.findMany({
      include: { stats: true },
      orderBy,
      take: limit,
    });

    return { data };
  }
}
