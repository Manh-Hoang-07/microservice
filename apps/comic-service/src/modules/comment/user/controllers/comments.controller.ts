import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserCommentService } from '../services/comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Controller('user/comments')
export class UserCommentController {
  constructor(private readonly commentService: UserCommentService) {}

  @Permission('user')
  @Post()
  async create(@Body() dto: CreateCommentDto) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.commentService.create(userId, dto);
  }

  @Permission('user')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { content: string }) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.commentService.update(userId, toPrimaryKey(id), body.content);
  }

  @Permission('user')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.commentService.delete(userId, toPrimaryKey(id));
  }
}
