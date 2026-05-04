import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { RedisService } from '@package/redis';
import { AboutSectionFilter, AboutSectionRepository } from '../../repositories/about-section.repository';

@Injectable()
export class PublicAboutService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly aboutRepo: AboutSectionRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  private async getOrSet<T>(key: string, ttl: number, loader: () => Promise<T>): Promise<T> {
    if (this.redis?.isEnabled()) {
      const cached = await this.redis.get(key);
      if (cached) return JSON.parse(cached);
    }
    const existing = this.inflight.get(key);
    if (existing) return existing;
    const promise = loader().then(async (result) => {
      this.inflight.delete(key);
      if (this.redis?.isEnabled()) {
        await this.redis.set(key, JSON.stringify(result), ttl).catch(() => {});
      }
      return result;
    }).catch((err) => {
      this.inflight.delete(key);
      throw err;
    });
    this.inflight.set(key, promise);
    return promise;
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: AboutSectionFilter = { status: 'active' };
    if (query.section_type) filter.section_type = query.section_type;

    return this.getOrSet('intro:public:about:list', 300, async () => {
      const [data, total] = await Promise.all([
        this.aboutRepo.findMany(filter, options),
        this.aboutRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getBySlug(slug: string) {
    return this.getOrSet(`intro:public:about:detail:${slug}`, 600, async () => {
      const item = await this.aboutRepo.findActiveBySlug(slug);
      if (!item) throw new NotFoundException('About section not found');
      return item;
    });
  }
}
