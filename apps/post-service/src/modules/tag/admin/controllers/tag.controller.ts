import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminTagService } from '../services/tag.service';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';
import { ListTagsAdminQueryDto } from '../dtos/list-tags.query.dto';

@Controller('admin/post-tags')
export class AdminTagController {
  constructor(private readonly tagService: AdminTagService) {}

  @Permission('post.manage')
  @Get()
  async getList(@Query() query: ListTagsAdminQueryDto) {
    return this.tagService.getList(query);
  }

  @Permission('post.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.tagService.getOne(toPrimaryKey(id));
  }

  @Permission('post.manage')
  @Post()
  async create(@Body() dto: CreateTagDto) {
    const ctx = session()!;
    const actorId = ctx.userId ? toPrimaryKey(ctx.userId) : undefined;
    return this.tagService.create(dto, actorId);
  }

  @Permission('post.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    const ctx = session()!;
    const actorId = ctx.userId ? toPrimaryKey(ctx.userId) : undefined;
    return this.tagService.update(toPrimaryKey(id), dto, actorId);
  }

  @Permission('post.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tagService.delete(toPrimaryKey(id));
  }
}
