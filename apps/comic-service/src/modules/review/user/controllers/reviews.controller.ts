import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { Authenticated, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserReviewService } from '../services/reviews.service';
import { CreateReviewDto } from '../dtos/create-review.dto';

@Controller('user/reviews')
export class UserReviewController {
  constructor(private readonly reviewService: UserReviewService) {}

  @Authenticated()
  @Post()
  async createOrUpdate(@Body() dto: CreateReviewDto) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.reviewService.createOrUpdate(userId, dto);
  }

  @Authenticated()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.reviewService.delete(userId, toPrimaryKey(id));
  }
}
