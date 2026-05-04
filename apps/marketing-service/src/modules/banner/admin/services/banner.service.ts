import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { CreateBannerDto } from '../dtos/create-banner.dto';
import { UpdateBannerDto } from '../dtos/update-banner.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { RedisService } from '@package/redis';
import { BannerFilter, BannerRepository } from '../../repositories/banner.repository';
import { BannerLocationRepository } from '../../../banner-location/repositories/banner-location.repository';

@Injectable()
export class AdminBannerService {
  constructor(
    private readonly bannerRepo: BannerRepository,
    private readonly locationRepo: BannerLocationRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  private async clearCache() {
    if (!this.redis?.isEnabled()) return;
    await this.redis.del('marketing:public:banners:list').catch(() => {});
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: BannerFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.location_id) filter.location_id = query.location_id;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.bannerRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.bannerRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const banner = await this.bannerRepo.findById(id);
    if (!banner) throw new NotFoundException('Banner not found');
    return banner;
  }

  async create(dto: CreateBannerDto) {
    await this.assertLocationExists(dto.location_id);

    const banner = await this.bannerRepo.create({
      title: dto.title,
      subtitle: dto.subtitle,
      image: dto.image,
      mobile_image: dto.mobile_image,
      link: dto.link,
      link_target: dto.link_target,
      description: dto.description,
      button_text: dto.button_text,
      button_color: dto.button_color,
      text_color: dto.text_color,
      location_id: dto.location_id,
      sort_order: dto.sort_order ?? 0,
      status: dto.status || 'active',
      start_date: dto.start_date,
      end_date: dto.end_date,
    });

    await this.clearCache();
    return this.getOne(banner.id);
  }

  async update(id: any, dto: UpdateBannerDto) {
    await this.getOne(id);

    if (dto.location_id) {
      await this.assertLocationExists(dto.location_id);
    }

    await this.bannerRepo.update(id, dto);
    await this.clearCache();
    return this.getOne(id);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.bannerRepo.delete(id);
    await this.clearCache();
    return { success: true };
  }

  private async assertLocationExists(locationId: any) {
    const location = await this.locationRepo.findById(locationId);
    if (!location) throw new NotFoundException('Banner location not found');
  }
}
