import { Controller, Get, Param, Query } from '@nestjs/common';
import { BffPostsService } from '../services/posts.service';

@Controller('posts')
export class BffPostsController {
  constructor(private readonly postsService: BffPostsService) {}

  // GET /api/posts?page=1&limit=20&tag=X&category=Y&search=Z&featured=true
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

  // GET /api/posts/categories
  @Get('categories')
  async getCategories() {
    return this.postsService.getCategories();
  }

  // GET /api/posts/tags
  @Get('tags')
  async getTags() {
    return this.postsService.getTags();
  }

  // GET /api/posts/:slug
  @Get(':slug')
  async getPost(@Param('slug') slug: string) {
    return this.postsService.getPost(slug);
  }

  // GET /api/posts/:slug/comments?page=1&limit=20
  @Get(':slug/comments')
  async getComments(
    @Param('slug') slug: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.postsService.getPostComments(slug, +page, +limit);
  }
}
