import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrimaryKey } from 'src/types';
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

  findById(id: PrimaryKey) {
    return this.prisma.partner.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.PartnerWhereInput) {
    return this.prisma.partner.findFirst({ where });
  }

  create(data: Prisma.PartnerCreateInput) {
    return this.prisma.partner.create({ data });
  }

  update(id: PrimaryKey, data: Prisma.PartnerUpdateInput) {
    return this.prisma.partner.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.partner.delete({ where: { id } });
  }
}
