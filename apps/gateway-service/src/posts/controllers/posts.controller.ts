import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { GatewayPostsService } from '../services/posts.service';

@ApiTags('Gateway Posts')
@Controller('posts')
export class GatewayPostsController {
  constructor(private readonly postsService: GatewayPostsService) {}

  @Public()
  @Get()
  async getPosts(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('tag') tag?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('featured') featured?: string,
  ) {
    if (search) {
      return this.postsService.searchPosts(search, +page, +limit);
    }
    if (featured === 'true') {
      return this.postsService.getFeaturedPosts(+limit);
    }
    return this.postsService.getPosts(+page, +limit, tag, category);
  }

  @Public()
  @Get('categories')
  async getCategories() {
    return this.postsService.getCategories();
  }

  @Public()
  @Get('tags')
  async getTags() {
    return this.postsService.getTags();
  }

  @Public()
  @Get(':slug')
  async getPost(@Param('slug') slug: string) {
    return this.postsService.getPost(slug);
  }

  @Public()
  @Get(':slug/comments')
  async getComments(
    @Param('slug') slug: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.postsService.getPostComments(slug, +page, +limit);
  }
}
