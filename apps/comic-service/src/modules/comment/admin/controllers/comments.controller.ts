import { Controller, Get, Patch, Param, Query, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { AdminCommentService } from '../services/comments.service';

@ApiTags('Admin Comments')
@Controller('admin/comments')
export class AdminCommentController {
  constructor(private readonly commentService: AdminCommentService) {}

  @Permission('comic.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.commentService.getList(query);
  }

  @Permission('comic.manage')
  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.commentService.updateStatus(id, body.status);
  }
}
