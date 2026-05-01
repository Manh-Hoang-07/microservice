import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { PublicCommentService } from '../services/comment.service';

@ApiTags('Public Post Comments')
@Controller('public/post-comments')
export class PublicCommentController {
  constructor(private readonly commentService: PublicCommentService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.commentService.getList(query);
  }
}
