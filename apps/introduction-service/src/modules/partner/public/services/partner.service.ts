import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PartnerFilter, PartnerRepository } from '../../repositories/partner.repository';

@Injectable()
export class PublicPartnerService {
  constructor(private readonly partnerRepo: PartnerRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: PartnerFilter = { status: 'active' };
    if (query.type) filter.type = query.type;

    const [data, total] = await Promise.all([
      this.partnerRepo.findMany(filter, options),
      this.partnerRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.partnerRepo.findActiveById(id);
    if (!item) throw new NotFoundException('Partner not found');
    return item;
  }
}
