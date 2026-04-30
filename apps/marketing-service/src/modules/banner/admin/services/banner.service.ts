import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from '../dtos/create-banner.dto';
import { UpdateBannerDto } from '../dtos/update-banner.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { toPrimaryKey, PrimaryKey } from 'src/types';
import { BannerRepository } from '../../repositories/banner.repository';
import { BannerLocationRepository } from '../../../banner-location/repositories/banner-location.repository';

@Injectable()
export class AdminBannerService {
  constructor(
    private readonly bannerRepo: BannerRepository,
    private readonly locationRepo: BannerLocationRepository,
  ) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.location_id) where.location_id = toPrimaryKey(query.location_id);

    const [data, total] = await Promise.all([
      this.bannerRepo.findMany(where, options),
      this.bannerRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const banner = await this.bannerRepo.findById(id);
    if (!banner) throw new NotFoundException('Banner not found');
    return banner;
  }

  async create(dto: CreateBannerDto) {
    const locationId = toPrimaryKey(dto.location_id);

    const location = await this.locationRepo.findById(locationId);
    if (!location) throw new NotFoundException('Banner location not found');

    const data: any = {
      title: dto.title,
      subtitle: dto.subtitle,
      image: dto.image,
      mobile_image: dto.mobile_image,
      link: dto.link,
      link_target: dto.link_target as any,
      description: dto.description,
      button_text: dto.button_text,
      button_color: dto.button_color,
      text_color: dto.text_color,
      location_id: locationId,
      sort_order: dto.sort_order ?? 0,
      status: dto.status || 'active',
    };

    if (dto.start_date) data.start_date = new Date(dto.start_date);
    if (dto.end_date) data.end_date = new Date(dto.end_date);

    const banner = await this.bannerRepo.create(data);
    return this.getOne(banner.id);
  }

  async update(id: PrimaryKey, dto: UpdateBannerDto) {
    await this.getOne(id);

    if (dto.location_id) {
      const locationId = toPrimaryKey(dto.location_id);
      const location = await this.locationRepo.findById(locationId);
      if (!location) throw new NotFoundException('Banner location not found');
    }

    const data: any = { ...dto };
    if (dto.location_id) data.location_id = toPrimaryKey(dto.location_id);
    if (dto.start_date) data.start_date = new Date(dto.start_date);
    if (dto.end_date) data.end_date = new Date(dto.end_date);

    await this.bannerRepo.update(id, data);
    return this.getOne(id);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.bannerRepo.delete(id);
    return { success: true };
  }
}
