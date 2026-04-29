import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class StaffRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.StaffWhereInput, options: { skip: number; take: number }) {
    return this.prisma.staff.findMany({
      where,
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.StaffWhereInput) {
    return this.prisma.staff.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.staff.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.StaffWhereInput) {
    return this.prisma.staff.findFirst({ where });
  }

  create(data: Prisma.StaffCreateInput) {
    return this.prisma.staff.create({ data });
  }

  update(id: bigint, data: Prisma.StaffUpdateInput) {
    return this.prisma.staff.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.staff.delete({ where: { id } });
  }
}
