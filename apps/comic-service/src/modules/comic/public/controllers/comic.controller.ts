import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public, session } from '@package/common';
import { PublicComicService } from '../services/comic.service';
import {
  ListChaptersBySlugQueryDto,
  ListComicsPublicQueryDto,
} from '../../admin/dtos/list-comics.query.dto';

@Controller('public/comics')
export class PublicComicController {
  constructor(private readonly comicsService: PublicComicService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListComicsPublicQueryDto) {
    return this.comicsService.getList(query);
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.comicsService.getBySlug(slug);
  }

  @Public()
  @Get(':slug/chapters')
  async getChaptersBySlug(
    @Param('slug') slug: string,
    @Query() query: ListChaptersBySlugQueryDto,
  ) {
    const ctx = session()!;
    const requesterKey = ctx.userId
      ? `u:${ctx.userId}`
      : `ip:${ctx.ip ?? 'unknown'}`;
    return this.comicsService.getChaptersBySlug(slug, query, requesterKey);
  }
}
