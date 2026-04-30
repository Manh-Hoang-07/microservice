import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class ContentTemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ContentTemplateWhereInput, options: { skip: number; take: number }) {
    return this.prisma.contentTemplate.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.ContentTemplateWhereInput) {
    return this.prisma.contentTemplate.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.contentTemplate.findUnique({ where: { id } });
  }

  findByCode(code: string) {
    return this.prisma.contentTemplate.findUnique({ where: { code } });
  }

  findFirst(where: Prisma.ContentTemplateWhereInput) {
    return this.prisma.contentTemplate.findFirst({ where });
  }

  create(data: Prisma.ContentTemplateCreateInput) {
    return this.prisma.contentTemplate.create({ data });
  }

  update(id: PrimaryKey, data: Prisma.ContentTemplateUpdateInput) {
    return this.prisma.contentTemplate.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.contentTemplate.delete({ where: { id } });
  }
}
