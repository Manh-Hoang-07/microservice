import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class FaqRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.FaqWhereInput, options: { skip: number; take: number }) {
    return this.prisma.faq.findMany({
      where,
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.FaqWhereInput) {
    return this.prisma.faq.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.faq.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.FaqWhereInput) {
    return this.prisma.faq.findFirst({ where });
  }

  create(data: Prisma.FaqCreateInput) {
    return this.prisma.faq.create({ data });
  }

  update(id: bigint, data: Prisma.FaqUpdateInput) {
    return this.prisma.faq.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.faq.delete({ where: { id } });
  }
}
