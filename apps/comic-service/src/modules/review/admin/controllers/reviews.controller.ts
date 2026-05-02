import { Controller, Get, Delete, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { AdminReviewService } from '../services/reviews.service';

@Controller('admin/reviews')
export class AdminReviewController {
  constructor(private readonly reviewService: AdminReviewService) {}

  @Permission('comic.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.reviewService.getList(query);
  }

  @Permission('comic.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
