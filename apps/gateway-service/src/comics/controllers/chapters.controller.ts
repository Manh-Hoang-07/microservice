import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { GatewayComicsService } from '../services/comics.service';

@ApiTags('Gateway Chapters')
@Controller('chapters')
export class GatewayChaptersController {
  constructor(private readonly comicsService: GatewayComicsService) {}

  @Public()
  @Get(':id')
  async getChapter(@Param('id') id: string) {
    return this.comicsService.getChapterDetail(id);
  }

  @Public()
  @Get(':id/pages')
  async getChapterPages(@Param('id') id: string) {
    return this.comicsService.getChapterPages(id);
  }
}
