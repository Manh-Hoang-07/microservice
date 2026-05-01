import { Controller, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { UserCommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@ApiTags('User Post Comments')
@Controller('user/post-comments')
export class UserCommentController {
  constructor(private readonly commentService: UserCommentService) {}

  @Permission('user')
  @Post()
  async create(@Req() req: any, @Body() dto: CreateCommentDto) {
    return this.commentService.create(req.user.sub, dto);
  }

  @Permission('user')
  @Put(':id')
  async update(@Req() req: any, @Param('id') id: string, @Body() body: { content: string }) {
    return this.commentService.update(req.user.sub, id, body.content);
  }

  @Permission('user')
  @Delete(':id')
  async delete(@Req() req: any, @Param('id') id: string) {
    return this.commentService.delete(req.user.sub, id);
  }
}
