import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicCommentService } from '../services/comments.service';

@ApiTags('Public Comments')
@Controller('public/comments')
export class PublicCommentController {
  constructor(private readonly commentService: PublicCommentService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.commentService.getList(query);
  }
}
