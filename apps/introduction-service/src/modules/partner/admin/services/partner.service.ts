import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from '../dtos/create-partner.dto';
import { UpdatePartnerDto } from '../dtos/update-partner.dto';
import { createPaginationMeta } from '@package/common';
import { PartnerRepository } from '../../repositories/partner.repository';

@Injectable()
export class AdminPartnerService {
  constructor(private readonly partnerRepo: PartnerRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.type) where.type = query.type;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.partnerRepo.findMany(where, { skip, take: limit }),
      this.partnerRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
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

  async update(id: bigint, dto: UpdatePartnerDto) {
    await this.getOne(id);
    return this.partnerRepo.update(id, dto as any);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.partnerRepo.delete(id);
    return { success: true };
  }
}
