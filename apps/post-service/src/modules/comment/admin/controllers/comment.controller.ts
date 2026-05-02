import { Controller, Get, Patch, Param, Query, Body } from '@nestjs/common';
import { Permission } from '@package/common';
import { AdminCommentService } from '../services/comment.service';

@Controller('admin/post-comments')
export class AdminCommentController {
  constructor(private readonly commentService: AdminCommentService) {}

  @Permission('post.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.commentService.getList(query);
  }

  @Permission('post.manage')
  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.commentService.updateStatus(id, body.status);
  }
}
