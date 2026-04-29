import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { AdminPostTagService } from '../services/post-tag.service';
import { CreatePostTagDto } from '../dtos/create-post-tag.dto';
import { UpdatePostTagDto } from '../dtos/update-post-tag.dto';

@ApiTags('Admin Post Tags')
@Controller('admin/post-tags')
export class AdminPostTagController {
  constructor(private readonly tagService: AdminPostTagService) {}

  @Permission('post.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.tagService.getList(query);
  }

  @Permission('post.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.tagService.getOne(BigInt(id));
  }

  @Permission('post.manage')
  @Post()
  async create(@Body() dto: CreatePostTagDto) {
    return this.tagService.create(dto);
  }

  @Permission('post.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostTagDto) {
    return this.tagService.update(BigInt(id), dto);
  }

  @Permission('post.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tagService.delete(BigInt(id));
  }
}
