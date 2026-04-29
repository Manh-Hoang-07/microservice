import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateBannerDto } from '../dtos/create-banner.dto';
import { UpdateBannerDto } from '../dtos/update-banner.dto';
import { createPaginationMeta, toPrimaryKey } from '../../../../common/pagination.helper';

@Injectable()
export class AdminBannerService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.location_id) where.location_id = toPrimaryKey(query.location_id);
    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { subtitle: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.banner.findMany({
        where,
        include: { location: true },
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.banner.count({ where }),
    ]);

    return {
      data,
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async getOne(id: bigint) {
    const banner = await this.prisma.banner.findUnique({
      where: { id },
      include: { location: true },
    });
    if (!banner) throw new NotFoundException('Banner not found');
    return banner;
  }

  async create(dto: CreateBannerDto) {
    const locationId = toPrimaryKey(dto.location_id);

    const location = await this.prisma.bannerLocation.findUnique({
      where: { id: locationId },
    });
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

    const banner = await this.prisma.banner.create({ data });
    return this.getOne(banner.id);
  }

  async update(id: bigint, dto: UpdateBannerDto) {
    await this.getOne(id);

    if (dto.location_id) {
      const locationId = toPrimaryKey(dto.location_id);
      const location = await this.prisma.bannerLocation.findUnique({
        where: { id: locationId },
      });
      if (!location) throw new NotFoundException('Banner location not found');
    }

    const data: any = { ...dto };
    if (dto.location_id) data.location_id = toPrimaryKey(dto.location_id);
    if (dto.start_date) data.start_date = new Date(dto.start_date);
    if (dto.end_date) data.end_date = new Date(dto.end_date);

    await this.prisma.banner.update({ where: { id }, data });
    return this.getOne(id);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.banner.delete({ where: { id } });
    return { success: true };
  }
}
