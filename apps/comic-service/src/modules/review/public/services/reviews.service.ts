import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { ReviewFilter, ReviewRepository } from '../../repositories/review.repository';

@Injectable()
export class PublicReviewService {
  constructor(private readonly reviewRepo: ReviewRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ReviewFilter = {};
    if (query.comic_id) filter.comic_id = query.comic_id;

    const [data, total, agg] = await Promise.all([
      this.reviewRepo.findMany(filter, options),
      this.reviewRepo.count(filter),
      this.reviewRepo.aggregateRatingForFilter(filter),
    ]);

    return {
      data,
      meta: createPaginationMeta(options, total),
      stats: {
        average_rating: agg._avg?.rating || 0,
        total_reviews: agg._count || 0,
      },
    };
  }
}
