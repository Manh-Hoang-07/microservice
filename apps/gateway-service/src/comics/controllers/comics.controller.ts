import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { GatewayComicsService } from '../services/comics.service';

@ApiTags('Gateway Comics')
@Controller('comics')
export class GatewayComicsController {
  constructor(private readonly comicsService: GatewayComicsService) {}

  @Public()
  @Get()
  async getComics(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '24',
    @Query('sort') sort = 'updated_at:desc',
  ) {
    if (search) {
      return this.comicsService.searchComics(search, +page, +limit, category);
    }
    return this.comicsService.getComicsByCategory(category ?? '', +page, +limit, sort);
  }

  @Public()
  @Get(':slug')
  async getComic(@Param('slug') slug: string) {
    return this.comicsService.getComicDetail(slug);
  }

  @Public()
  @Get(':slug/chapters')
  async getChapters(
    @Param('slug') slug: string,
    @Query('page') page = '1',
    @Query('limit') limit = '30',
  ) {
    return this.comicsService.getComicChapters(slug, +page, +limit);
  }

  @Public()
  @Get(':slug/comments')
  async getComments(
    @Param('slug') slug: string,
    @Query('comic_id') comicId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.comicsService.getComicComments(comicId ?? slug, +page, +limit);
  }

  @Public()
  @Get(':slug/reviews')
  async getReviews(
    @Param('slug') slug: string,
    @Query('comic_id') comicId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.comicsService.getComicReviews(comicId ?? slug, +page, +limit);
  }
}
