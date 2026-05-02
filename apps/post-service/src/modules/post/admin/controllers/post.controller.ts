import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
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
    return this.postService.getOne(id);
  }

  @Permission('post.manage')
  @Post()
  async create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Permission('post.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postService.update(id, dto);
  }

  @Permission('post.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
