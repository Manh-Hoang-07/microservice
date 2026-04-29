import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '../../../../common/permission.decorator';
import { UserPostCommentService } from '../services/post-comment.service';
import { CreatePostCommentDto } from '../dtos/create-post-comment.dto';

@ApiTags('User Post Comments')
@Controller('user/post-comments')
export class UserPostCommentController {
  constructor(private readonly commentService: UserPostCommentService) {}

  @Permission('user')
  @Post()
  async create(@Req() req: any, @Body() dto: CreatePostCommentDto) {
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
