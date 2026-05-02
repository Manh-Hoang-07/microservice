import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { AdminTagService } from '../services/tag.service';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';

@Controller('admin/post-tags')
export class AdminTagController {
  constructor(private readonly tagService: AdminTagService) {}

  @Permission('post.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.tagService.getList(query);
  }

  @Permission('post.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.tagService.getOne(id);
  }

  @Permission('post.manage')
  @Post()
  async create(@Body() dto: CreateTagDto) {
    return this.tagService.create(dto);
  }

  @Permission('post.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    return this.tagService.update(id, dto);
  }

  @Permission('post.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tagService.delete(id);
  }
}
