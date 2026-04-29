import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateBannerLocationDto } from '../dtos/create-banner-location.dto';
import { UpdateBannerLocationDto } from '../dtos/update-banner-location.dto';
import { createPaginationMeta } from '@package/common';
import { BannerLocationRepository } from '../../repositories/banner-location.repository';

@Injectable()
export class AdminBannerLocationService {
  constructor(private readonly locationRepo: BannerLocationRepository) {}

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
      this.locationRepo.findMany(where, { skip, take: limit }),
      this.locationRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const location = await this.locationRepo.findById(id);
    if (!location) throw new NotFoundException('Banner location not found');
    return location;
  }

  async create(dto: CreateBannerLocationDto) {
    const existing = await this.locationRepo.findByCode(dto.code);
    if (existing) throw new ConflictException('Banner location code already exists');

    return this.locationRepo.create({
      code: dto.code,
      name: dto.name,
      description: dto.description,
      status: dto.status || 'active',
    });
  }

  async update(id: bigint, dto: UpdateBannerLocationDto) {
    await this.getOne(id);

    if (dto.code) {
      const existing = await this.locationRepo.findFirst({ code: dto.code, NOT: { id } });
      if (existing) throw new ConflictException('Banner location code already exists');
    }

    return this.locationRepo.update(id, dto);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.locationRepo.delete(id);
    return { success: true };
  }

  async changeStatus(id: bigint, status: string) {
    await this.getOne(id);
    return this.locationRepo.update(id, { status });
  }
}
