import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProvinceRepository } from '../../repositories/province.repository';
import { toPrimaryKey } from '../../../../../common/core/primary-key.util';
import { createPaginationMeta } from '../../../../../common/core/pagination.helper';

@Injectable()
export class ProvinceService {
  constructor(private readonly provinceRepo: ProvinceRepository) {}

  async getList(query: any = {}) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: Prisma.ProvinceWhereInput = {};
    if (query.name) where.name = { contains: query.name };
    if (query.status) where.status = query.status;
    if (query.code) where.code = query.code;
    if (query.country_id) where.country_id = toPrimaryKey(query.country_id);

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.provinceRepo.findMany(where, { skip, take: limit }),
      skipCount ? Promise.resolve(0) : this.provinceRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getSimpleList(query: any = {}) {
    return this.getList({ ...query, limit: query.limit ?? 1000, skipCount: true });
  }

  async getOne(id: any) {
    const item = await this.provinceRepo.findById(toPrimaryKey(id));
    if (!item) throw new NotFoundException(`Resource with ID ${id} not found`);
    return item;
  }

  async create(dto: any) {
    const data: any = { ...dto };
    if (data.country_id) data.country_id = toPrimaryKey(data.country_id);
    return this.provinceRepo.create(data);
  }

  async update(id: any, dto: any) {
    await this.getOne(id);
    const data: any = { ...dto };
    if (data.country_id) data.country_id = toPrimaryKey(data.country_id);
    return this.provinceRepo.update(toPrimaryKey(id), data);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.provinceRepo.delete(toPrimaryKey(id));
    return true;
  }
}
