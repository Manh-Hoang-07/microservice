import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicCommentService } from '../services/comments.service';

@Controller('public/comments')
export class PublicCommentController {
  constructor(private readonly commentService: PublicCommentService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.commentService.getList(query);
  }
}
