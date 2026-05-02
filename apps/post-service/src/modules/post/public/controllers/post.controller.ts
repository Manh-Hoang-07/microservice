import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicPostService } from '../services/post.service';

@Controller('public/posts')
export class PublicPostController {
  constructor(private readonly postService: PublicPostService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.postService.getList(query);
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.postService.getBySlug(slug);
  }
}
