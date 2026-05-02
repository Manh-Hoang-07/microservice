import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Public } from '@package/common';
import { Request } from 'express';
import { PublicComicService } from '../services/comic.service';
import {
  ListChaptersBySlugQueryDto,
  ListComicsPublicQueryDto,
} from '../../admin/dtos/list-comics.query.dto';

function requesterKeyFor(req: Request): string {
  // Prefer authenticated user id (stable, no NAT collision); fall back to IP.
  const sub = (req as any).user?.sub ?? (req as any).user?.id;
  if (sub) return `u:${sub}`;
  // `req.ip` honours `trust proxy` if set; combined with NAT this still
  // groups some users behind shared exits — best-effort dedup, not auth.
  return `ip:${req.ip ?? req.socket?.remoteAddress ?? 'unknown'}`;
}

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
    @Req() req: Request,
  ) {
    return this.comicsService.getChaptersBySlug(slug, query, requesterKeyFor(req));
  }
}
