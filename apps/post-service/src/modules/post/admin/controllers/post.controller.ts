import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminPostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { ListPostsAdminQueryDto } from '../dtos/list-posts.query.dto';

@Controller('admin/posts')
export class AdminPostController {
  constructor(private readonly postService: AdminPostService) {}

  @Permission('post.manage')
  @Get()
  async getList(@Query() query: ListPostsAdminQueryDto) {
    return this.postService.getList(query);
  }

  @Permission('post.manage')
  @Get('simple')
  async getSimpleList(@Query() query: ListPostsAdminQueryDto) {
    return this.postService.getSimpleList(query);
  }

  @Permission('post.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.postService.getOne(toPrimaryKey(id));
  }

  @Permission('post.manage')
  @Post()
  async create(@Body() dto: CreatePostDto, @Req() req: Request) {
    const actorId = (req as any).user?.sub ? toPrimaryKey((req as any).user.sub) : undefined;
    return this.postService.create(dto, actorId);
  }

  @Permission('post.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Req() req: Request) {
    const actorId = (req as any).user?.sub ? toPrimaryKey((req as any).user.sub) : undefined;
    return this.postService.update(toPrimaryKey(id), dto, actorId);
  }

  @Permission('post.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(toPrimaryKey(id));
  }
}
