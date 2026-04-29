import { Injectable } from '@nestjs/common';
import { createPaginationMeta, toPrimaryKey } from '@package/common';
import { BannerRepository } from '../../repositories/banner.repository';

@Injectable()
export class PublicBannerService {
  constructor(private readonly bannerRepo: BannerRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 20, 1);
    const skip = (page - 1) * limit;

    const now = new Date();
    const where: any = {
      status: 'active',
      OR: [{ start_date: null }, { start_date: { lte: now } }],
      AND: [{ OR: [{ end_date: null }, { end_date: { gte: now } }] }],
    };

    if (query.location_id) where.location_id = toPrimaryKey(query.location_id);
    if (query.location_code) where.location = { code: query.location_code };

    const [data, total] = await Promise.all([
      this.bannerRepo.findManyPublic(where, { skip, take: limit }),
      this.bannerRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }
}
