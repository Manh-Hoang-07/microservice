import { Injectable } from '@nestjs/common';
import { PostClient } from '../../clients/post.client';
import { GatewayCacheService } from '../../cache/cache.service';

@Injectable()
export class GatewayPostsService {
  constructor(
    private readonly postClient: PostClient,
    private readonly cache: GatewayCacheService,
  ) {}

  async getPosts(page = 1, limit = 20, tag?: string, category?: string) {
    return this.cache.getOrSet(
      `posts:list:${page}:${limit}:${tag ?? ''}:${category ?? ''}`,
      () => this.postClient.getPosts({ page, limit, tag, category }),
      120,
    );
  }

  async getPost(slug: string) {
    return this.cache.getOrSet(`post:${slug}`, () => this.postClient.getPost(slug), 300);
  }

  async getPostComments(slug: string, page = 1, limit = 20) {
    return this.cache.getOrSet(
      `post:comments:${slug}:${page}`,
      () => this.postClient.getPostComments(slug, { page, limit }),
      60,
    );
  }

  async getCategories() {
    return this.cache.getOrSet('post:categories', () => this.postClient.getPostCategories(), 600);
  }

  async getTags() {
    return this.cache.getOrSet('post:tags', () => this.postClient.getPostTags(), 600);
  }

  async getFeaturedPosts(limit = 5) {
    return this.cache.getOrSet(
      `posts:featured:${limit}`,
      () => this.postClient.getFeaturedPosts(limit),
      300,
    );
  }

  async searchPosts(query: string, page = 1, limit = 20) {
    return this.cache.getOrSet(
      `search:posts:${query}:${page}:${limit}`,
      () => this.postClient.searchPosts(query, { page, limit }),
      30,
    );
  }
}
