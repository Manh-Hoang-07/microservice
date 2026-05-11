import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public, session } from '@package/common';
import { PublicPostService } from '../services/post.service';
import { ListPostsPublicQueryDto } from '../dtos/list-posts.query.dto';

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
  async getBySlug(@Param('slug') slug: string) {
    const ctx = session()!;
    const requesterKey = ctx.userId ? `u:${ctx.userId}` : `ip:${ctx.ip ?? 'unknown'}`;
    return this.postService.getBySlug(slug, requesterKey);
  }
}
