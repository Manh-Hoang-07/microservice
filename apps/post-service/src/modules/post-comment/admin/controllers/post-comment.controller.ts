import { Controller, Get, Patch, Param, Query, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '../../../../common/permission.decorator';
import { AdminPostCommentService } from '../services/post-comment.service';

@ApiTags('Admin Post Comments')
@Controller('admin/post-comments')
export class AdminPostCommentController {
  constructor(private readonly commentService: AdminPostCommentService) {}

  @Permission('post.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.commentService.getList(query);
  }

  @Permission('post.manage')
  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.commentService.updateStatus(BigInt(id), body.status);
  }
}
