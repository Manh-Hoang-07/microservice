import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { AdminChapterService } from '../services/chapter.service';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { UpdateChapterDto } from '../dtos/update-chapter.dto';
import { ListChaptersAdminQueryDto } from '../dtos/list-chapters.query.dto';

@Controller('admin/chapters')
export class AdminChapterController {
  constructor(private readonly chapterService: AdminChapterService) {}

  @Permission('comic.manage')
  @Get()
  async getList(@Query() query: ListChaptersAdminQueryDto) {
    return this.chapterService.getList(query);
  }

  @Permission('comic.manage')
  @Get('simple')
  async getSimpleList(@Query() query: ListChaptersAdminQueryDto) {
    return this.chapterService.getSimpleList(query);
  }

  @Permission('comic.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.chapterService.getOne(id);
  }

  @Permission('comic.manage')
  @Post()
  async create(@Body() dto: CreateChapterDto) {
    return this.chapterService.create(dto);
  }

  @Permission('comic.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateChapterDto) {
    return this.chapterService.update(id, dto);
  }

  @Permission('comic.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.chapterService.delete(id);
  }
}
