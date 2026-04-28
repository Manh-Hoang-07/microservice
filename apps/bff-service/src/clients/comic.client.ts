import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface ComicListItem {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  view_count?: number;
  follow_count?: number;
  [key: string]: unknown;
}

export interface ComicCategory {
  id: string;
  name: string;
  slug: string;
  [key: string]: unknown;
}

@Injectable()
export class ComicClient {
  private readonly logger = new Logger(ComicClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = config.get<string>('bff.comicServiceUrl', 'http://localhost:3001/api');
    this.timeout = config.get<number>('bff.serviceTimeoutMs', 5000);
  }

  async getComics(params: {
    limit?: number;
    sort?: string;
  }): Promise<ComicListItem[]> {
    const url = new URL(`${this.baseUrl}/comics`);
    if (params.limit) url.searchParams.set('limit', String(params.limit));
    if (params.sort) url.searchParams.set('sort', params.sort);

    return this.get<ComicListItem[]>(url.toString(), []);
  }

  async getLatestChapters(limit = 8): Promise<unknown[]> {
    const url = new URL(`${this.baseUrl}/comics/latest-chapters`);
    url.searchParams.set('limit', String(limit));
    return this.get<unknown[]>(url.toString(), []);
  }

  async getCategories(): Promise<ComicCategory[]> {
    const url = `${this.baseUrl}/comic-categories?limit=20`;
    return this.get<ComicCategory[]>(url, []);
  }

  async getComic(slug: string): Promise<unknown> {
    return this.get<unknown>(`${this.baseUrl}/comics/${slug}`, null);
  }

  async getComicChapters(slug: string, params?: { page?: number; limit?: number }): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/comics/${slug}/chapters`);
    if (params?.page) url.searchParams.set('page', String(params.page));
    if (params?.limit) url.searchParams.set('limit', String(params.limit));
    return this.get<unknown>(url.toString(), null);
  }

  async getChapter(comicSlug: string, chapterSlug: string): Promise<unknown> {
    return this.get<unknown>(`${this.baseUrl}/comics/${comicSlug}/chapters/${chapterSlug}`, null);
  }

  async getComicComments(slug: string, params?: { page?: number; limit?: number }): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/comics/${slug}/comments`);
    if (params?.page) url.searchParams.set('page', String(params.page));
    if (params?.limit) url.searchParams.set('limit', String(params.limit));
    return this.get<unknown>(url.toString(), null);
  }

  async getComicReviews(slug: string, params?: { page?: number; limit?: number }): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/comics/${slug}/reviews`);
    if (params?.page) url.searchParams.set('page', String(params.page));
    if (params?.limit) url.searchParams.set('limit', String(params.limit));
    return this.get<unknown>(url.toString(), null);
  }

  async searchComics(query: string, params?: { page?: number; limit?: number; category?: string }): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/comics`);
    url.searchParams.set('search', query);
    if (params?.page) url.searchParams.set('page', String(params.page));
    if (params?.limit) url.searchParams.set('limit', String(params.limit));
    if (params?.category) url.searchParams.set('category', params.category);
    return this.get<unknown>(url.toString(), null);
  }

  async getComicsByCategory(categorySlug: string, params?: { page?: number; limit?: number; sort?: string }): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/comics`);
    if (categorySlug) url.searchParams.set('category', categorySlug);
    if (params?.page) url.searchParams.set('page', String(params.page));
    if (params?.limit) url.searchParams.set('limit', String(params.limit));
    if (params?.sort) url.searchParams.set('sort', params.sort);
    return this.get<unknown>(url.toString(), null);
  }

  async getTopComics(type: 'day' | 'week' | 'month' | 'all', limit?: number): Promise<unknown[]> {
    const url = new URL(`${this.baseUrl}/comics/top`);
    url.searchParams.set('type', type);
    if (limit) url.searchParams.set('limit', String(limit));
    return this.get<unknown[]>(url.toString(), []);
  }

  private async get<T>(url: string, fallback: T): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        this.logger.warn(`ComicClient GET ${url} → ${res.status}`);
        return fallback;
      }

      const data = (await res.json()) as { data?: T } | T;
      return (data as any)?.data ?? (data as T);
    } catch (err) {
      this.logger.warn(`ComicClient GET ${url} failed: ${(err as Error).message}`);
      return fallback;
    } finally {
      clearTimeout(timer);
    }
  }
}
