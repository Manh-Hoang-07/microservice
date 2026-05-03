import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicCommentService } from '../services/comments.service';
import { ListCommentsPublicQueryDto } from '../dtos/list-comments.query.dto';

@Controller('public/comments')
export class PublicCommentController {
  constructor(private readonly commentService: PublicCommentService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListCommentsPublicQueryDto) {
    return this.commentService.getList(query);
  }
}
