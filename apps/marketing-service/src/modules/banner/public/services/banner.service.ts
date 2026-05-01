import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { BannerFilter, BannerRepository } from '../../repositories/banner.repository';

@Injectable()
export class PublicBannerService {
  constructor(private readonly bannerRepo: BannerRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: BannerFilter = {
      status: 'active',
      active_at: new Date(),
    };
    if (query.location_id) filter.location_id = query.location_id;
    if (query.location_code) filter.location_code = query.location_code;

    const [data, total] = await Promise.all([
      this.bannerRepo.findManyPublic(filter, options),
      this.bannerRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }
}
