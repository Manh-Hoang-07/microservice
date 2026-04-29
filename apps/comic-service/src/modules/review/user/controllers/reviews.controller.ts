import { Controller, Post, Delete, Body, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '../../../../common/permission.decorator';
import { UserReviewService } from '../services/reviews.service';
import { CreateReviewDto } from '../dtos/create-review.dto';

@ApiTags('User Reviews')
@Controller('user/reviews')
export class UserReviewController {
  constructor(private readonly reviewService: UserReviewService) {}

  @Permission('user')
  @Post()
  async createOrUpdate(@Req() req: any, @Body() dto: CreateReviewDto) {
    const userId = BigInt(req.user.sub);
    return this.reviewService.createOrUpdate(userId, dto);
  }

  @Permission('user')
  @Delete(':id')
  async delete(@Req() req: any, @Param('id') id: string) {
    const userId = BigInt(req.user.sub);
    return this.reviewService.delete(userId, BigInt(id));
  }
}
