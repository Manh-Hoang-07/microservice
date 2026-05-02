import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Public } from '@package/common';
import { Request } from 'express';
import { PublicPostService } from '../services/post.service';
import { ListPostsPublicQueryDto } from '../dtos/list-posts.query.dto';

function requesterKeyFor(req: Request): string {
  // Prefer authenticated user id; fall back to IP. Used only for view dedup,
  // not for any authorization check.
  const sub = (req as any).user?.sub ?? (req as any).user?.id;
  if (sub) return `u:${sub}`;
  return `ip:${req.ip ?? req.socket?.remoteAddress ?? 'unknown'}`;
}

@Controller('public/posts')
export class PublicPostController {
  constructor(private readonly postService: PublicPostService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListPostsPublicQueryDto) {
    return this.postService.getList(query);
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string, @Req() req: Request) {
    return this.postService.getBySlug(slug, requesterKeyFor(req));
  }
}
