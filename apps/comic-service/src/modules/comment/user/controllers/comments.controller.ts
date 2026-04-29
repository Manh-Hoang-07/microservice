import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { UserCommentService } from '../services/comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@ApiTags('User Comments')
@Controller('user/comments')
export class UserCommentController {
  constructor(private readonly commentService: UserCommentService) {}

  @Permission('user')
  @Post()
  async create(@Req() req: any, @Body() dto: CreateCommentDto) {
    const userId = BigInt(req.user.sub);
    return this.commentService.create(userId, dto);
  }

  @Permission('user')
  @Put(':id')
  async update(@Req() req: any, @Param('id') id: string, @Body() body: { content: string }) {
    const userId = BigInt(req.user.sub);
    return this.commentService.update(userId, BigInt(id), body.content);
  }

  @Permission('user')
  @Delete(':id')
  async delete(@Req() req: any, @Param('id') id: string) {
    const userId = BigInt(req.user.sub);
    return this.commentService.delete(userId, BigInt(id));
  }
}
