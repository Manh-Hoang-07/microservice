import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateBannerLocationDto } from '../dtos/create-banner-location.dto';
import { UpdateBannerLocationDto } from '../dtos/update-banner-location.dto';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class AdminBannerLocationService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { code: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.bannerLocation.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.bannerLocation.count({ where }),
    ]);

    return {
      data,
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async getOne(id: bigint) {
    const location = await this.prisma.bannerLocation.findUnique({
      where: { id },
      include: { banners: true },
    });
    if (!location) throw new NotFoundException('Banner location not found');
    return location;
  }

  async create(dto: CreateBannerLocationDto) {
    const existing = await this.prisma.bannerLocation.findUnique({
      where: { code: dto.code },
    });
    if (existing) throw new ConflictException('Banner location code already exists');

    return this.prisma.bannerLocation.create({
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        status: dto.status || 'active',
      },
    });
  }

  async update(id: bigint, dto: UpdateBannerLocationDto) {
    await this.getOne(id);

    if (dto.code) {
      const existing = await this.prisma.bannerLocation.findFirst({
        where: { code: dto.code, NOT: { id } },
      });
      if (existing) throw new ConflictException('Banner location code already exists');
    }

    return this.prisma.bannerLocation.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.bannerLocation.delete({ where: { id } });
    return { success: true };
  }

  async changeStatus(id: bigint, status: string) {
    await this.getOne(id);
    return this.prisma.bannerLocation.update({
      where: { id },
      data: { status },
    });
  }
}
