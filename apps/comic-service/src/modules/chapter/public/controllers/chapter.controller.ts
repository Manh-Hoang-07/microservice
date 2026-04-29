import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicChapterService } from '../services/chapter.service';

@ApiTags('Public Chapters')
@Controller('public/chapters')
export class PublicChapterController {
  constructor(private readonly chapterService: PublicChapterService) {}

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.chapterService.getOne(BigInt(id));
  }

  @Public()
  @Get(':id/pages')
  async getPages(@Param('id') id: string) {
    return this.chapterService.getPages(BigInt(id));
  }

  @Public()
  @Get(':id/next')
  async getNext(@Param('id') id: string) {
    return this.chapterService.getNext(BigInt(id));
  }

  @Public()
  @Get(':id/prev')
  async getPrev(@Param('id') id: string) {
    return this.chapterService.getPrev(BigInt(id));
  }
}
