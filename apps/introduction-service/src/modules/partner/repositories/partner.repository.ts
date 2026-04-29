import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PartnerRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.PartnerWhereInput, options: { skip: number; take: number }) {
    return this.prisma.partner.findMany({
      where,
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.PartnerWhereInput) {
    return this.prisma.partner.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.partner.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.PartnerWhereInput) {
    return this.prisma.partner.findFirst({ where });
  }

  create(data: Prisma.PartnerCreateInput) {
    return this.prisma.partner.create({ data });
  }

  update(id: bigint, data: Prisma.PartnerUpdateInput) {
    return this.prisma.partner.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.partner.delete({ where: { id } });
  }
}
