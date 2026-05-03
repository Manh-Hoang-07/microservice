import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface ContactFilter {
  search?: string;
  status?: string;
  email?: string;
}

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: ContactFilter): Prisma.ContactWhereInput {
    const where: Prisma.ContactWhereInput = {};
    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { email: { contains: filter.search } },
        { message: { contains: filter.search } },
      ];
    }
    if (filter.status) where.status = filter.status as Prisma.ContactWhereInput['status'];
    if (filter.email) where.email = filter.email;
    return where;
  }

  findMany(filter: ContactFilter, options: { skip: number; take: number }) {
    return this.prisma.contact.findMany({
      where: this.buildWhere(filter),
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: ContactFilter) {
    return this.prisma.contact.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.contact.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  create(data: Record<string, any>) {
    return this.prisma.contact.create({
      data: data as Prisma.ContactUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.contact.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.ContactUncheckedUpdateInput,
    });
  }

  createOutbox(event_type: string, payload: Record<string, any>) {
    return this.prisma.outbox.create({ data: { event_type, payload } });
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    if (payload.replied_by !== undefined && payload.replied_by !== null) {
      payload.replied_by = toPrimaryKey(payload.replied_by);
    }
    if (payload.replied_at !== undefined && payload.replied_at !== null && !(payload.replied_at instanceof Date)) {
      payload.replied_at = new Date(payload.replied_at);
    }
    return payload;
  }
}
