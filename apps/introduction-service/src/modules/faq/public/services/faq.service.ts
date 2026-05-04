import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { RedisService } from '@package/redis';
import { FaqFilter, FaqRepository } from '../../repositories/faq.repository';

@Injectable()
export class PublicFaqService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly faqRepo: FaqRepository,
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

    const filter: FaqFilter = { status: 'active' };
    if (query.search) filter.search = query.search;

    return this.getOrSet('intro:public:faq:list', 300, async () => {
      const [data, total] = await Promise.all([
        this.faqRepo.findMany(filter, options),
        this.faqRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: any) {
    return this.getOrSet(`intro:public:faq:detail:${id}`, 600, async () => {
      const item = await this.faqRepo.findActiveById(id);
      if (!item) throw new NotFoundException('FAQ not found');
      return item;
    });
  }

  async incrementViewCount(id: any) {
    const item = await this.getOne(id);
    await this.faqRepo.update(id, { view_count: { increment: 1 } });
    return { success: true, view_count: item.view_count + 1 };
  }

  async incrementHelpfulCount(id: any) {
    const item = await this.getOne(id);
    await this.faqRepo.update(id, { helpful_count: { increment: 1 } });
    return { success: true, helpful_count: item.helpful_count + 1 };
  }
}
