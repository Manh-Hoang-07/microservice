import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ContactWhereInput, options: { skip: number; take: number }) {
    return this.prisma.contact.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.ContactWhereInput) {
    return this.prisma.contact.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  create(data: { name: string; email: string; phone?: string | null; message: string }) {
    return this.prisma.contact.create({ data });
  }

  createOutbox(data: Prisma.MarketingOutboxCreateInput) {
    return this.prisma.marketingOutbox.create({ data });
  }

  update(id: PrimaryKey, data: Prisma.ContactUpdateInput) {
    return this.prisma.contact.update({ where: { id }, data });
  }
}
