import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { toPrimaryKey } from 'src/types';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { ReviewRepository } from '../../repositories/review.repository';

@Injectable()
export class UserReviewService {
  constructor(private readonly reviewRepo: ReviewRepository) {}

  async createOrUpdate(userId: any, dto: CreateReviewDto) {
    const review = await this.reviewRepo.upsert(userId, dto.comic_id, {
      rating: dto.rating,
      content: dto.content,
    });

    await this.reviewRepo.syncRatingStats(dto.comic_id);
    return review;
  }

  async delete(userId: any, id: any) {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new NotFoundException('Review not found');
    if (review.user_id !== toPrimaryKey(userId)) throw new ForbiddenException('Not your review');

    await this.reviewRepo.delete(id);
    await this.reviewRepo.syncRatingStats(review.comic_id);
    return { success: true };
  }
}
