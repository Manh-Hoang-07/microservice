import { Controller, Get, Param, Query } from '@nestjs/common';
import { BffComicsService } from './comics.service';

@Controller('comics')
export class BffComicsController {
  constructor(private readonly comicsService: BffComicsService) {}

  // GET /api/comics?search=X&category=Y&page=1&limit=24&sort=updated_at
  @Get()
  async getComics(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '24',
    @Query('sort') sort = 'updated_at',
  ) {
    if (search) {
      return this.comicsService.searchComics(search, +page, +limit, category);
    }
    if (category) {
      return this.comicsService.getComicsByCategory(category, +page, +limit, sort);
    }
    // Default: latest updated
    return this.comicsService.getComicsByCategory('', +page, +limit, sort);
  }

  // GET /api/comics/top?type=week&limit=10
  @Get('top')
  async getTopComics(
    @Query('type') type: 'day' | 'week' | 'month' | 'all' = 'week',
    @Query('limit') limit = '10',
  ) {
    return this.comicsService.getTopComics(type, +limit);
  }

  // GET /api/comics/:slug
  @Get(':slug')
  async getComic(@Param('slug') slug: string) {
    return this.comicsService.getComicDetail(slug);
  }

  // GET /api/comics/:slug/chapters?page=1&limit=30
  @Get(':slug/chapters')
  async getChapters(
    @Param('slug') slug: string,
    @Query('page') page = '1',
    @Query('limit') limit = '30',
  ) {
    return this.comicsService.getComicChapters(slug, +page, +limit);
  }

  // GET /api/comics/:slug/chapters/:chapterSlug
  @Get(':slug/chapters/:chapterSlug')
  async getChapter(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
  ) {
    return this.comicsService.getChapterDetail(slug, chapterSlug);
  }

  // GET /api/comics/:slug/comments?page=1&limit=20
  @Get(':slug/comments')
  async getComments(
    @Param('slug') slug: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.comicsService.getComicComments(slug, +page, +limit);
  }

  // GET /api/comics/:slug/reviews?page=1&limit=10
  @Get(':slug/reviews')
  async getReviews(
    @Param('slug') slug: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.comicsService.getComicReviews(slug, +page, +limit);
  }
}
