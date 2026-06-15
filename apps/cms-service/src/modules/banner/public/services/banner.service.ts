import { Injectable, Optional } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CachedService, RedisService } from '@package/redis';
import { BannerFilter, BannerRepository } from '../../repositories/banner.repository';
import { BannerStatus } from '../../enums/banner-status.enum';

@Injectable()
export class PublicBannerService extends CachedService {
  protected readonly cacheEntity = 'banners';
  protected readonly cacheNamespace = 'cms:public';

  constructor(
    private readonly bannerRepo: BannerRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: BannerFilter = {
      status: BannerStatus.active,
      activeAt: new Date(),
    };
    if (query.locationId) filter.locationId = query.locationId;
    if (query.locationCode) filter.locationCode = query.locationCode;

    // `activeAt` is "now" on every call — exclude it from the cache key so it
    // does not bust the cache each request. The 300s TTL bounds staleness.
    const { activeAt: _activeAt, ...keyFilter } = filter;

    return this.cachedList(keyFilter, options, 300, async () => {
      const [data, total] = await Promise.all([
        this.bannerRepo.findManyPublic(filter, options),
        this.bannerRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }
}
