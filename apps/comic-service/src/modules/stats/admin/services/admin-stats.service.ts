import { Injectable } from '@nestjs/common';
import { ComicStatsRepository } from '../../repositories/comic-stats.repository';

@Injectable()
export class AdminStatsService {
  constructor(private readonly statsRepo: ComicStatsRepository) {}

  async getDashboard() {
    const [totalComics, totalViews, totalFollows] = await Promise.all([
      this.statsRepo.countComics(),
      this.statsRepo.aggregateViews(),
      this.statsRepo.aggregateFollows(),
    ]);

    const topComics = await this.statsRepo.findTopComics({ stats: { view_count: 'desc' } }, 10);

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

    const data = await this.statsRepo.findTopComics(orderBy, limit);
    return { data };
  }
}
