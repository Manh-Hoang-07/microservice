import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { PartnerRepository } from '../../repositories/partner.repository';

@Injectable()
export class PublicPartnerService {
  constructor(private readonly partnerRepo: PartnerRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'active' };
    if (query.type) where.type = query.type;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.partnerRepo.findMany(where, { skip, take: limit }),
      this.partnerRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.partnerRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('Partner not found');
    return item;
  }
}
