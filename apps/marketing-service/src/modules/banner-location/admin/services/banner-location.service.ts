import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateBannerLocationDto } from '../dtos/create-banner-location.dto';
import { UpdateBannerLocationDto } from '../dtos/update-banner-location.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { BannerLocationRepository } from '../../repositories/banner-location.repository';

@Injectable()
export class AdminBannerLocationService {
  constructor(private readonly locationRepo: BannerLocationRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.locationRepo.findMany(where, options),
      this.locationRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
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

  async update(id: PrimaryKey, dto: UpdateBannerLocationDto) {
    await this.getOne(id);

    if (dto.code) {
      const existing = await this.locationRepo.findFirst({ code: dto.code, NOT: { id } });
      if (existing) throw new ConflictException('Banner location code already exists');
    }

    return this.locationRepo.update(id, dto);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.locationRepo.delete(id);
    return { success: true };
  }

  async changeStatus(id: PrimaryKey, status: string) {
    await this.getOne(id);
    return this.locationRepo.update(id, { status });
  }
}
