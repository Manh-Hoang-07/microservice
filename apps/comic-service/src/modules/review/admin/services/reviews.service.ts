import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ComicReviewRepository } from '../../repositories/comic-review.repository';

@Injectable()
export class AdminReviewService {
  constructor(private readonly reviewRepo: ComicReviewRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);

    const [data, total] = await Promise.all([
      this.reviewRepo.findMany(where, options),
      this.reviewRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async delete(id: PrimaryKey) {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new NotFoundException('Review not found');

    await this.reviewRepo.delete(id);
    await this.reviewRepo.syncRatingStats(review.comic_id);

    return { success: true };
  }
}
