import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface TagFilter {
  search?: string;
  is_active?: boolean;
}

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: TagFilter): Prisma.TagWhereInput {
    const where: Prisma.TagWhereInput = {};
    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { slug: { contains: filter.search } },
      ];
    }
    if (filter.is_active !== undefined) where.is_active = filter.is_active;
    return where;
  }

  findMany(filter: TagFilter, options: { skip: number; take: number }) {
    return this.prisma.tag.findMany({
      where: this.buildWhere(filter),
      orderBy: { name: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: TagFilter) {
    return this.prisma.tag.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.tag.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  findBySlug(slug: string) {
    return this.prisma.tag.findUnique({ where: { slug } });
  }

  findAllActive() {
    return this.prisma.tag.findMany({
      where: { is_active: true },
      select: { id: true, name: true, slug: true, description: true },
      orderBy: { name: 'asc' },
    });
  }

  create(data: Record<string, any>) {
    return this.prisma.tag.create({
      data: this.normalizePayload(data) as Prisma.TagUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.tag.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.TagUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.tag.delete({ where: { id: toPrimaryKey(id) } });
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    const bigIntFields = ['created_user_id', 'updated_user_id', 'group_id'];
    for (const field of bigIntFields) {
      const value = payload[field];
      if (value === undefined) continue;
      payload[field] = value === null || value === '' ? null : toPrimaryKey(value);
    }
    return payload;
  }
}
