import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface TestimonialFilter {
  search?: string;
  status?: string;
  featured?: boolean;
  project_id?: any;
}

const PROJECT_SELECT = { id: true, name: true, slug: true } as const;

@Injectable()
export class TestimonialRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: TestimonialFilter): Prisma.TestimonialWhereInput {
    const where: Prisma.TestimonialWhereInput = {};
    if (filter.search) {
      where.OR = [
        { client_name: { contains: filter.search } },
        { client_company: { contains: filter.search } },
        { content: { contains: filter.search } },
      ];
    }
    if (filter.status) where.status = filter.status;
    if (filter.featured !== undefined) where.featured = filter.featured;
    if (filter.project_id !== undefined) where.project_id = toPrimaryKey(filter.project_id);
    return where;
  }

  findMany(filter: TestimonialFilter, options: { skip: number; take: number }) {
    return this.prisma.testimonial.findMany({
      where: this.buildWhere(filter),
      include: { project: { select: PROJECT_SELECT } },
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: TestimonialFilter) {
    return this.prisma.testimonial.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.testimonial.findUnique({
      where: { id: toPrimaryKey(id) },
      include: { project: { select: PROJECT_SELECT } },
    });
  }

  findActiveById(id: any) {
    return this.prisma.testimonial.findFirst({
      where: { id: toPrimaryKey(id), status: 'active' },
      include: { project: { select: PROJECT_SELECT } },
    });
  }

  create(data: Record<string, any>) {
    return this.prisma.testimonial.create({
      data: this.normalizePayload(data) as Prisma.TestimonialUncheckedCreateInput,
      include: { project: { select: PROJECT_SELECT } },
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.testimonial.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.TestimonialUncheckedUpdateInput,
      include: { project: { select: PROJECT_SELECT } },
    });
  }

  delete(id: any) {
    return this.prisma.testimonial.delete({ where: { id: toPrimaryKey(id) } });
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    if (payload.project_id !== undefined) {
      payload.project_id = payload.project_id === null || payload.project_id === ''
        ? null
        : toPrimaryKey(payload.project_id);
    }
    return payload;
  }
}
