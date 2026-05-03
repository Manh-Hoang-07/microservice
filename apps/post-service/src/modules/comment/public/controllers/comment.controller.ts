import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicCommentService } from '../services/comment.service';
import { ListCommentsPublicQueryDto } from '../dtos/list-comments.query.dto';

@Controller('public/post-comments')
export class PublicCommentController {
  constructor(private readonly commentService: PublicCommentService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListCommentsPublicQueryDto) {
    return this.commentService.getList(query);
  }
}
