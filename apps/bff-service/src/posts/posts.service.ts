import { Injectable } from '@nestjs/common';
import { MainClient } from '../clients/main.client';
import { BffCacheService } from '../cache/bff-cache.service';

@Injectable()
export class BffPostsService {
  constructor(
    private readonly mainClient: MainClient,
    private readonly cache: BffCacheService,
  ) {}

  async getPosts(page = 1, limit = 20, tag?: string, category?: string) {
    return this.cache.getOrSet(
      `posts:list:${page}:${limit}:${tag ?? ''}:${category ?? ''}`,
      () => this.mainClient.getPosts({ page, limit, tag, category }),
      120,
    );
  }

  async getPost(slug: string) {
    return this.cache.getOrSet(`post:${slug}`, () => this.mainClient.getPost(slug), 300);
  }

  async getPostComments(slug: string, page = 1, limit = 20) {
    return this.cache.getOrSet(
      `post:comments:${slug}:${page}`,
      () => this.mainClient.getPostComments(slug, { page, limit }),
      60,
    );
  }

  async getCategories() {
    return this.cache.getOrSet('post:categories', () => this.mainClient.getPostCategories(), 600);
  }

  async getTags() {
    return this.cache.getOrSet('post:tags', () => this.mainClient.getPostTags(), 600);
  }

  async getFeaturedPosts(limit = 5) {
    return this.cache.getOrSet(
      `posts:featured:${limit}`,
      () => this.mainClient.getFeaturedPosts(limit),
      300,
    );
  }

  async searchPosts(query: string, page = 1, limit = 20) {
    return this.cache.getOrSet(
      `search:posts:${query}:${page}:${limit}`,
      () => this.mainClient.searchPosts(query, { page, limit }),
      30,
    );
  }
}
