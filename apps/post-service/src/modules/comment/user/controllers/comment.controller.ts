import { Controller, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserCommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Controller('user/post-comments')
export class UserCommentController {
  constructor(private readonly commentService: UserCommentService) {}

  @Permission('user')
  @Post()
  async create(@Req() req: Request, @Body() dto: CreateCommentDto) {
    const userId = toPrimaryKey((req as any).user.sub);
    return this.commentService.create(userId, dto);
  }

  @Permission('user')
  @Put(':id')
  async update(@Req() req: Request, @Param('id') id: string, @Body() body: { content: string }) {
    const userId = toPrimaryKey((req as any).user.sub);
    return this.commentService.update(userId, toPrimaryKey(id), body.content);
  }

  @Permission('user')
  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    const userId = toPrimaryKey((req as any).user.sub);
    return this.commentService.delete(userId, toPrimaryKey(id));
  }
}
