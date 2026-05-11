import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserReviewService } from '../services/reviews.service';
import { CreateReviewDto } from '../dtos/create-review.dto';

@Controller('user/reviews')
export class UserReviewController {
  constructor(private readonly reviewService: UserReviewService) {}

  @Permission('user')
  @Post()
  async createOrUpdate(@Body() dto: CreateReviewDto) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.reviewService.createOrUpdate(userId, dto);
  }

  @Permission('user')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.reviewService.delete(userId, toPrimaryKey(id));
  }
}
