import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { PublicChapterService } from '../services/chapter.service';

@ApiTags('Public Chapters')
@Controller('public/chapters')
export class PublicChapterController {
  constructor(private readonly chapterService: PublicChapterService) {}

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.chapterService.getOne(toPrimaryKey(id));
  }

  @Public()
  @Get(':id/pages')
  async getPages(@Param('id') id: string) {
    return this.chapterService.getPages(toPrimaryKey(id));
  }

  @Public()
  @Get(':id/next')
  async getNext(@Param('id') id: string) {
    return this.chapterService.getNext(toPrimaryKey(id));
  }

  @Public()
  @Get(':id/prev')
  async getPrev(@Param('id') id: string) {
    return this.chapterService.getPrev(toPrimaryKey(id));
  }
}
