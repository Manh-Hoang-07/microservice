import { Injectable } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { ComicReviewRepository } from '../../repositories/comic-review.repository';

@Injectable()
export class PublicReviewService {
  constructor(private readonly reviewRepo: ComicReviewRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);

    const [data, total] = await Promise.all([
      this.reviewRepo.findMany(where, { skip, take: limit }),
      this.reviewRepo.count(where),
    ]);

    const agg = await this.reviewRepo.aggregateRatingWithAvg(where);

    return {
      data,
      meta: createPaginationMeta(page, limit, total),
      stats: {
        average_rating: agg._avg?.rating || 0,
        total_reviews: agg._count || 0,
      },
    };
  }
}
