import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PostTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.PostTagWhereInput, options: { skip: number; take: number }) {
    return this.prisma.postTag.findMany({
      where,
      orderBy: { name: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.PostTagWhereInput) {
    return this.prisma.postTag.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.postTag.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.PostTagWhereInput) {
    return this.prisma.postTag.findFirst({ where });
  }

  findAllActive() {
    return this.prisma.postTag.findMany({
      where: { is_active: true },
      select: { id: true, name: true, slug: true, description: true },
      orderBy: { name: 'asc' },
    });
  }

  create(data: Prisma.PostTagCreateInput) {
    return this.prisma.postTag.create({ data });
  }

  update(id: bigint, data: Prisma.PostTagUpdateInput) {
    return this.prisma.postTag.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.postTag.delete({ where: { id } });
  }
}
