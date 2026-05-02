import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicComicService } from '../services/comic.service';

@Controller('public/comics')
export class PublicComicController {
  constructor(private readonly comicsService: PublicComicService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.comicsService.getList(query);
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.comicsService.getBySlug(slug);
  }

  @Public()
  @Get(':slug/chapters')
  async getChaptersBySlug(@Param('slug') slug: string, @Query() query: any) {
    return this.comicsService.getChaptersBySlug(slug, query);
  }
}
