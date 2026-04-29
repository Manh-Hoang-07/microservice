import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CountryRepository } from '../../repositories/country.repository';
import { toPrimaryKey } from '../../../../../common/core/primary-key.util';
import { createPaginationMeta } from '../../../../../common/core/pagination.helper';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepo: CountryRepository) {}

  async getList(query: any = {}) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: Prisma.CountryWhereInput = {};
    if (query.name) where.name = { contains: query.name };
    if (query.status) where.status = query.status;
    if (query.code) where.code = query.code;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.countryRepo.findMany(where, { skip, take: limit }),
      skipCount ? Promise.resolve(0) : this.countryRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getSimpleList(query: any = {}) {
    return this.getList({ ...query, limit: query.limit ?? 1000, skipCount: true });
  }

  async getOne(id: any) {
    const item = await this.countryRepo.findById(toPrimaryKey(id));
    if (!item) throw new NotFoundException(`Resource with ID ${id} not found`);
    return item;
  }

  async create(dto: any) {
    return this.countryRepo.create(dto);
  }

  async update(id: any, dto: any) {
    await this.getOne(id);
    return this.countryRepo.update(toPrimaryKey(id), dto);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.countryRepo.delete(toPrimaryKey(id));
    return true;
  }
}
