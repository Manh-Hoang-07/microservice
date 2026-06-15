import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CachedService, RedisService } from '@package/redis';
import { AboutSectionFilter, AboutSectionRepository } from '../../repositories/about-section.repository';
import { BasicStatus } from '../../../../common/enums/status.enum';

@Injectable()
export class PublicAboutService extends CachedService {
  protected readonly cacheEntity = 'about';
  protected readonly cacheNamespace = 'cms:public';

  constructor(
    private readonly aboutRepo: AboutSectionRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: AboutSectionFilter = { status: BasicStatus.active };
    if (query.sectionType) filter.sectionType = query.sectionType;

    return this.cachedList(filter, options, 300, async () => {
      const [data, total] = await Promise.all([
        this.aboutRepo.findMany(filter, options),
        this.aboutRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getBySlug(slug: string) {
    return this.cachedDetail(slug, 600, async () => {
      const item = await this.aboutRepo.findActiveBySlug(slug);
      if (!item) throw new NotFoundException('About section not found');
      return item;
    });
  }
}
