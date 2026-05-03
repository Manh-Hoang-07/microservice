import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicReviewService } from '../services/reviews.service';
import { ListReviewsPublicQueryDto } from '../dtos/list-reviews.query.dto';

@Controller('public/reviews')
export class PublicReviewController {
  constructor(private readonly reviewService: PublicReviewService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListReviewsPublicQueryDto) {
    return this.reviewService.getList(query);
  }
}
