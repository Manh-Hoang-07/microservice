import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { PublicPostCommentService } from '../services/post-comment.service';

@ApiTags('Public Post Comments')
@Controller('public/post-comments')
export class PublicPostCommentController {
  constructor(private readonly commentService: PublicPostCommentService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.commentService.getList(query);
  }
}
