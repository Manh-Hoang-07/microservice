import { Module } from '@nestjs/common';
import { AdminReviewController } from './admin/controllers/reviews.controller';
import { AdminReviewService } from './admin/services/reviews.service';
import { PublicReviewController } from './public/controllers/reviews.controller';
import { PublicReviewService } from './public/services/reviews.service';
import { UserReviewController } from './user/controllers/reviews.controller';
import { UserReviewService } from './user/services/reviews.service';
import { ReviewRepository } from './repositories/review.repository';

@Module({
  controllers: [AdminReviewController, PublicReviewController, UserReviewController],
  providers: [ReviewRepository, AdminReviewService, PublicReviewService, UserReviewService],
})
export class ReviewModule {}
