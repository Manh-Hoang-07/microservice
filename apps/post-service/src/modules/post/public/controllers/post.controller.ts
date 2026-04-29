import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicPostService } from '../services/post.service';

@ApiTags('Public Posts')
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
