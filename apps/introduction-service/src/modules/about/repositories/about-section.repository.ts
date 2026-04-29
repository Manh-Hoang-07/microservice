import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class AboutSectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.AboutSectionWhereInput, options: { skip: number; take: number }) {
    return this.prisma.aboutSection.findMany({
      where,
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.AboutSectionWhereInput) {
    return this.prisma.aboutSection.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.aboutSection.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.AboutSectionWhereInput) {
    return this.prisma.aboutSection.findFirst({ where });
  }

  create(data: Prisma.AboutSectionCreateInput) {
    return this.prisma.aboutSection.create({ data });
  }

  update(id: bigint, data: Prisma.AboutSectionUpdateInput) {
    return this.prisma.aboutSection.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.aboutSection.delete({ where: { id } });
  }
}
