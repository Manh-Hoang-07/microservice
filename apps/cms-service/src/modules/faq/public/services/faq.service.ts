import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CachedService, RedisService } from '@package/redis';
import { FaqFilter, FaqRepository } from '../../repositories/faq.repository';
import { BasicStatus } from '../../../../common/enums/status.enum';

@Injectable()
export class PublicFaqService extends CachedService {
  protected readonly cacheEntity = 'faq';
  protected readonly cacheNamespace = 'cms:public';

  constructor(
    private readonly faqRepo: FaqRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: FaqFilter = { status: BasicStatus.active };
    if (query.search) filter.search = query.search;

    return this.cachedList(filter, options, 300, async () => {
      const [data, total] = await Promise.all([
        this.faqRepo.findMany(filter, options),
        this.faqRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: PrimaryKey) {
    return this.cachedDetail(id.toString(), 600, async () => {
      const item = await this.faqRepo.findActiveById(id);
      if (!item) throw new NotFoundException('FAQ not found');
      return item;
    });
  }

  async incrementViewCount(id: PrimaryKey) {
    const item = await this.getOne(id);
    await this.faqRepo.update(id, { viewCount: { increment: 1 } });
    return { success: true, view_count: item.viewCount + 1 };
  }

  async incrementHelpfulCount(id: PrimaryKey) {
    const item = await this.getOne(id);
    await this.faqRepo.update(id, { helpfulCount: { increment: 1 } });
    return { success: true, helpful_count: item.helpfulCount + 1 };
  }
}
