import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { PartnerRepository } from '../../repositories/partner.repository';

@Injectable()
export class PublicPartnerService {
  constructor(private readonly partnerRepo: PartnerRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: 'active' };
    if (query.type) where.type = query.type;

    const [data, total] = await Promise.all([
      this.partnerRepo.findMany(where, options),
      this.partnerRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.partnerRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('Partner not found');
    return item;
  }
}
