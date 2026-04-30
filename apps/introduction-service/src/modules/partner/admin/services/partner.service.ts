import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from '../dtos/create-partner.dto';
import { UpdatePartnerDto } from '../dtos/update-partner.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { PartnerRepository } from '../../repositories/partner.repository';

@Injectable()
export class AdminPartnerService {
  constructor(private readonly partnerRepo: PartnerRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.type) where.type = query.type;

    const [data, total] = await Promise.all([
      this.partnerRepo.findMany(where, options),
      this.partnerRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.partnerRepo.findById(id);
    if (!item) throw new NotFoundException('Partner not found');
    return item;
  }

  async create(dto: CreatePartnerDto) {
    return this.partnerRepo.create({
      name: dto.name,
      logo: dto.logo,
      website: dto.website,
      description: dto.description,
      type: dto.type,
      status: dto.status || 'active',
      sort_order: dto.sort_order ?? 0,
    });
  }

  async update(id: PrimaryKey, dto: UpdatePartnerDto) {
    await this.getOne(id);
    return this.partnerRepo.update(id, dto as any);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.partnerRepo.delete(id);
    return { success: true };
  }
}
