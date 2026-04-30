import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { toPrimaryKey, PrimaryKey } from 'src/types';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { ComicReviewRepository } from '../../repositories/comic-review.repository';

@Injectable()
export class UserReviewService {
  constructor(private readonly reviewRepo: ComicReviewRepository) {}

  async createOrUpdate(userId: PrimaryKey, dto: CreateReviewDto) {
    const comicId = toPrimaryKey(dto.comic_id);

    const review = await this.reviewRepo.upsert(userId, comicId, {
      rating: dto.rating,
      content: dto.content,
    });

    await this.reviewRepo.syncRatingStats(comicId);
    return review;
  }

  async delete(userId: PrimaryKey, id: PrimaryKey) {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new NotFoundException('Review not found');
    if (review.user_id !== userId) throw new ForbiddenException('Not your review');

    await this.reviewRepo.delete(id);
    await this.reviewRepo.syncRatingStats(review.comic_id);
    return { success: true };
  }
}
