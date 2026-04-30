import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { ComicReviewRepository } from '../../repositories/comic-review.repository';

@Injectable()
export class PublicReviewService {
  constructor(private readonly reviewRepo: ComicReviewRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);

    const [data, total] = await Promise.all([
      this.reviewRepo.findMany(where, options),
      this.reviewRepo.count(where),
    ]);

    const agg = await this.reviewRepo.aggregateRatingWithAvg(where);

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
