import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CachedService, RedisService } from '@package/redis';
import { TestimonialFilter, TestimonialRepository } from '../../repositories/testimonial.repository';
import { BasicStatus } from '../../../../common/enums/status.enum';

@Injectable()
export class PublicTestimonialService extends CachedService {
  protected readonly cacheEntity = 'testimonial';
  protected readonly cacheNamespace = 'cms:public';

  constructor(
    private readonly testimonialRepo: TestimonialRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: TestimonialFilter = { status: BasicStatus.active };
    if (query.featured !== undefined) {
      filter.featured = query.featured === 'true' || query.featured === true;
    }
    if (query.projectId) filter.projectId = query.projectId;

    return this.cachedList(filter, options, 300, async () => {
      const [data, total] = await Promise.all([
        this.testimonialRepo.findMany(filter, options),
        this.testimonialRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: PrimaryKey) {
    return this.cachedDetail(id.toString(), 600, async () => {
      const item = await this.testimonialRepo.findActiveById(id);
      if (!item) throw new NotFoundException('Testimonial not found');
      return item;
    });
  }
}
