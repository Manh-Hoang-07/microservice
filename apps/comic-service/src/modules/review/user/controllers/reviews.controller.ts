import { Controller, Post, Delete, Body, Param, Req } from '@nestjs/common';
import { Permission } from '@package/common';
import { UserReviewService } from '../services/reviews.service';
import { CreateReviewDto } from '../dtos/create-review.dto';

@Controller('user/reviews')
export class UserReviewController {
  constructor(private readonly reviewService: UserReviewService) {}

  @Permission('user')
  @Post()
  async createOrUpdate(@Req() req: any, @Body() dto: CreateReviewDto) {
    return this.reviewService.createOrUpdate(req.user.sub, dto);
  }

  @Permission('user')
  @Delete(':id')
  async delete(@Req() req: any, @Param('id') id: string) {
    return this.reviewService.delete(req.user.sub, id);
  }
}
