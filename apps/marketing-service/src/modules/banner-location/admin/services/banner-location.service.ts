import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { CreateBannerLocationDto } from '../dtos/create-banner-location.dto';
import { UpdateBannerLocationDto } from '../dtos/update-banner-location.dto';
import { ChangeStatusDto } from '../dtos/change-status.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { BannerLocationFilter, BannerLocationRepository } from '../../repositories/banner-location.repository';

@Injectable()
export class AdminBannerLocationService {
  constructor(private readonly locationRepo: BannerLocationRepository) {}

  private mapP2002(err: unknown): never {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new ConflictException('Banner location code already exists');
    }
    throw err;
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: BannerLocationFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.locationRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.locationRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const location = await this.locationRepo.findById(id);
    if (!location) throw new NotFoundException('Banner location not found');
    return location;
  }

  async create(dto: CreateBannerLocationDto) {
    const existing = await this.locationRepo.findByCode(dto.code);
    if (existing) throw new ConflictException('Banner location code already exists');

    try {
      return await this.locationRepo.create({
        code: dto.code,
        name: dto.name,
        description: dto.description,
        status: dto.status || 'active',
      });
    } catch (err) {
      // Concurrent creates raced our `findByCode` check.
      this.mapP2002(err);
    }
  }

  async update(id: any, dto: UpdateBannerLocationDto) {
    await this.getOne(id);

    if (dto.code) {
      const existing = await this.locationRepo.findCodeConflict(dto.code, id);
      if (existing) throw new ConflictException('Banner location code already exists');
    }

    try {
      return await this.locationRepo.update(id, dto);
    } catch (err) {
      this.mapP2002(err);
    }
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.locationRepo.delete(id);
    return { success: true };
  }

  async changeStatus(id: any, dto: ChangeStatusDto) {
    await this.getOne(id);
    return this.locationRepo.update(id, { status: dto.status });
  }
}
