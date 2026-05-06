import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../core/database/prisma.service';

type Tx = Prisma.TransactionClient | PrismaService;

export interface ContactFilter {
  search?: string;
  status?: string;
  email?: string;
}

const ALLOWED_FIELDS: ReadonlySet<string> = new Set([
  'name',
  'email',
  'phone',
  'message',
  'status',
  'reply',
  'replied_at',
  'replied_by',
]);

const SORTABLE_FIELDS: ReadonlySet<string> = new Set([
  'name',
  'email',
  'status',
  'created_at',
  'updated_at',
  'replied_at',
]);

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

  private buildOrderBy(sort?: string): Prisma.ContactOrderByWithRelationInput {
    if (!sort) return { created_at: 'desc' };
    const [field, dirRaw] = sort.split(':');
    if (!field || !SORTABLE_FIELDS.has(field)) return { created_at: 'desc' };
    const dir: 'asc' | 'desc' = dirRaw?.toLowerCase() === 'asc' ? 'asc' : 'desc';
    return { [field]: dir } as Prisma.ContactOrderByWithRelationInput;
  }

  findMany(filter: ContactFilter, options: { skip: number; take: number; sort?: string }) {
    return this.prisma.contact.findMany({
      where: this.buildWhere(filter),
      orderBy: this.buildOrderBy(options.sort),
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

  create(data: Record<string, any>, tx?: Tx) {
    const client = tx ?? this.prisma;
    return client.contact.create({
      data: this.normalizePayload(data) as Prisma.ContactUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.contact.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.ContactUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.contact.delete({ where: { id: toPrimaryKey(id) } });
  }

  createOutbox(event_type: string, payload: Record<string, any>, tx?: Tx) {
    const client = tx ?? this.prisma;
    return client.outbox.create({ data: { event_type, payload } });
  }

  async withTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(fn);
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      if (ALLOWED_FIELDS.has(key)) payload[key] = data[key];
    }
    if (payload.replied_by !== undefined && payload.replied_by !== null) {
      payload.replied_by = toPrimaryKey(payload.replied_by);
    }
    if (payload.replied_at !== undefined && payload.replied_at !== null && !(payload.replied_at instanceof Date)) {
      payload.replied_at = new Date(payload.replied_at);
    }
    return payload;
  }
}
