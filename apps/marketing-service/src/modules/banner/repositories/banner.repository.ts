import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface BannerFilter {
  search?: string;
  status?: string;
  location_id?: any;
  location_code?: string;
  active_at?: Date;
}

const PUBLIC_INCLUDE = {
  location: { select: { id: true, code: true, name: true } },
} as const;

@Injectable()
export class BannerRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: BannerFilter): Prisma.BannerWhereInput {
    const where: Prisma.BannerWhereInput = {};
    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search } },
        { subtitle: { contains: filter.search } },
      ];
    }
    if (filter.status) where.status = filter.status;
    if (filter.location_id !== undefined) where.location_id = toPrimaryKey(filter.location_id);
    if (filter.location_code) where.location = { code: filter.location_code };
    if (filter.active_at) {
      where.AND = [
        { OR: [{ start_date: null }, { start_date: { lte: filter.active_at } }] },
        { OR: [{ end_date: null }, { end_date: { gte: filter.active_at } }] },
      ];
    }
    return where;
  }

  findMany(filter: BannerFilter, options: { skip: number; take: number }) {
    return this.prisma.banner.findMany({
      where: this.buildWhere(filter),
      include: { location: true },
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(filter: BannerFilter, options: { skip: number; take: number }) {
    return this.prisma.banner.findMany({
      where: this.buildWhere(filter),
      include: PUBLIC_INCLUDE,
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: BannerFilter) {
    return this.prisma.banner.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.banner.findUnique({
      where: { id: toPrimaryKey(id) },
      include: { location: true },
    });
  }

  create(data: Record<string, any>) {
    return this.prisma.banner.create({
      data: this.normalizePayload(data) as Prisma.BannerUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.banner.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.BannerUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.banner.delete({ where: { id: toPrimaryKey(id) } });
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    if (payload.location_id !== undefined && payload.location_id !== null) {
      payload.location_id = toPrimaryKey(payload.location_id);
    }
    if (payload.start_date !== undefined && payload.start_date !== null) {
      payload.start_date = new Date(payload.start_date);
    }
    if (payload.end_date !== undefined && payload.end_date !== null) {
      payload.end_date = new Date(payload.end_date);
    }
    return payload;
  }
}
