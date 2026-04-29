import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCircuitBreaker } from '@package/circuit-breaker';
import type { CircuitBreakerPolicy } from 'cockatiel';

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  [key: string]: unknown;
}

@Injectable()
export class MainClient implements OnModuleInit {
  private readonly logger = new Logger(MainClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;
  private breaker!: CircuitBreakerPolicy;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = config.get<string>('bff.postServiceUrl', config.get<string>('bff.mainServiceUrl', 'http://localhost:3007/api'));
    this.timeout = config.get<number>('bff.serviceTimeoutMs', 5000);
  }

  onModuleInit() {
    this.breaker = createCircuitBreaker({ halfOpenAfterMs: 10_000, maxConsecutiveFailures: 5 });
  }

  async getLatestPosts(limit = 6): Promise<PostListItem[]> {
    const url = `${this.baseUrl}/posts?limit=${limit}&sort=created_at:DESC`;
    return this.get<PostListItem[]>(url, []);
  }

  async getPosts(params?: { page?: number; limit?: number; tag?: string; category?: string }): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/posts`);
    if (params?.page) url.searchParams.set('page', String(params.page));
    if (params?.limit) url.searchParams.set('limit', String(params.limit));
    if (params?.tag) url.searchParams.set('tag', params.tag);
    if (params?.category) url.searchParams.set('category', params.category);
    return this.get<unknown>(url.toString(), null);
  }

  async getPost(slug: string): Promise<unknown> {
    return this.get<unknown>(`${this.baseUrl}/posts/${slug}`, null);
  }

  async getPostComments(slug: string, params?: { page?: number; limit?: number }): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/posts/${slug}/comments`);
    if (params?.page) url.searchParams.set('page', String(params.page));
    if (params?.limit) url.searchParams.set('limit', String(params.limit));
    return this.get<unknown>(url.toString(), null);
  }

  async getPostCategories(): Promise<unknown[]> {
    return this.get<unknown[]>(`${this.baseUrl}/post-categories?limit=30`, []);
  }

  async getPostTags(): Promise<unknown[]> {
    return this.get<unknown[]>(`${this.baseUrl}/tags?limit=50`, []);
  }

  async getFeaturedPosts(limit?: number): Promise<unknown[]> {
    const url = new URL(`${this.baseUrl}/posts`);
    url.searchParams.set('featured', 'true');
    if (limit) url.searchParams.set('limit', String(limit));
    return this.get<unknown[]>(url.toString(), []);
  }

  async searchPosts(query: string, params?: { page?: number; limit?: number }): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/posts`);
    url.searchParams.set('search', query);
    if (params?.page) url.searchParams.set('page', String(params.page));
    if (params?.limit) url.searchParams.set('limit', String(params.limit));
    return this.get<unknown>(url.toString(), null);
  }

  private async get<T>(url: string, fallback: T): Promise<T> {
    try {
      return await this.breaker.execute(() => this.doGet<T>(url, fallback));
    } catch (err) {
      this.logger.warn(`MainClient circuit open for ${url}: ${(err as Error).message}`);
      return fallback;
    }
  }

  private async doGet<T>(url: string, fallback: T): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        this.logger.warn(`MainClient GET ${url} → ${res.status}`);
        return fallback;
      }

      const data = (await res.json()) as { data?: T } | T;
      return (data as any)?.data ?? (data as T);
    } catch (err) {
      this.logger.warn(`MainClient GET ${url} failed: ${(err as Error).message}`);
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
