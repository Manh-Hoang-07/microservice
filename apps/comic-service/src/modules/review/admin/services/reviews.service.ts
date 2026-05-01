import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { ReviewFilter, ReviewRepository } from '../../repositories/review.repository';

@Injectable()
export class AdminReviewService {
  constructor(private readonly reviewRepo: ReviewRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ReviewFilter = {};
    if (query.comic_id) filter.comic_id = query.comic_id;
    if (query.user_id) filter.user_id = query.user_id;
    if (query.rating) filter.rating = Number(query.rating);

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.reviewRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.reviewRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async delete(id: any) {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new NotFoundException('Review not found');

    await this.reviewRepo.delete(id);
    await this.reviewRepo.syncRatingStats(review.comic_id);

    return { success: true };
  }
}
