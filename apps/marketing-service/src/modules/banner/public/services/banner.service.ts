import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { BannerRepository } from '../../repositories/banner.repository';

@Injectable()
export class PublicBannerService {
  constructor(private readonly bannerRepo: BannerRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const now = new Date();
    const where: any = {
      status: 'active',
      OR: [{ start_date: null }, { start_date: { lte: now } }],
      AND: [{ OR: [{ end_date: null }, { end_date: { gte: now } }] }],
    };

    if (query.location_id) where.location_id = toPrimaryKey(query.location_id);
    if (query.location_code) where.location = { code: query.location_code };

    const [data, total] = await Promise.all([
      this.bannerRepo.findManyPublic(where, options),
      this.bannerRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }
}
