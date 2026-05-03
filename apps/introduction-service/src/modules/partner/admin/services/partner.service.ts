import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from '../dtos/create-partner.dto';
import { UpdatePartnerDto } from '../dtos/update-partner.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PartnerFilter, PartnerRepository } from '../../repositories/partner.repository';

@Injectable()
export class AdminPartnerService {
  constructor(private readonly partnerRepo: PartnerRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: PartnerFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.type) filter.type = query.type;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.partnerRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.partnerRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.partnerRepo.findById(id);
    if (!item) throw new NotFoundException('Partner not found');
    return item;
  }

  async create(dto: CreatePartnerDto) {
    return this.partnerRepo.create({
      ...dto,
      status: dto.status || 'active',
      sort_order: dto.sort_order ?? 0,
    });
  }

  async update(id: any, dto: UpdatePartnerDto) {
    await this.getOne(id);
    return this.partnerRepo.update(id, dto);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.partnerRepo.delete(id);
    return { success: true };
  }
}
