import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicReviewService } from '../services/reviews.service';

@ApiTags('Public Reviews')
@Controller('public/reviews')
export class PublicReviewController {
  constructor(private readonly reviewService: PublicReviewService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.reviewService.getList(query);
  }
}
