import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface ProjectFilter {
  search?: string;
  status?: string | string[];
  featured?: boolean;
  slug?: string;
}

const PUBLIC_INCLUDE = {
  testimonials: { where: { status: 'active' as const }, orderBy: { sort_order: 'asc' as const } },
} as const;

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: ProjectFilter): Prisma.ProjectWhereInput {
    const where: Prisma.ProjectWhereInput = {};
    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { slug: { contains: filter.search } },
        { client_name: { contains: filter.search } },
      ];
    }
    if (filter.status !== undefined) {
      where.status = Array.isArray(filter.status) ? { in: filter.status } : filter.status;
    }
    if (filter.featured !== undefined) where.featured = filter.featured;
    if (filter.slug) where.slug = filter.slug;
    return where;
  }

  findMany(filter: ProjectFilter, options: { skip: number; take: number }) {
    return this.prisma.project.findMany({
      where: this.buildWhere(filter),
      include: { testimonials: true },
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(filter: ProjectFilter, options: { skip: number; take: number }) {
    return this.prisma.project.findMany({
      where: this.buildWhere(filter),
      include: PUBLIC_INCLUDE,
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: ProjectFilter) {
    return this.prisma.project.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.project.findUnique({
      where: { id: toPrimaryKey(id) },
      include: { testimonials: true },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.project.findUnique({ where: { slug } });
  }

  findPublicBySlug(slug: string, statuses: string[]) {
    return this.prisma.project.findFirst({
      where: { slug, status: { in: statuses } },
      include: PUBLIC_INCLUDE,
    });
  }

  create(data: Record<string, any>) {
    return this.prisma.project.create({
      data: this.normalizePayload(data) as Prisma.ProjectUncheckedCreateInput,
      include: { testimonials: true },
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.project.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.ProjectUncheckedUpdateInput,
      include: { testimonials: true },
    });
  }

  incrementViewCount(id: any) {
    return this.prisma.project.update({
      where: { id: toPrimaryKey(id) },
      data: { view_count: { increment: 1 } },
    });
  }

  delete(id: any) {
    return this.prisma.project.delete({ where: { id: toPrimaryKey(id) } });
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    if (payload.start_date && !(payload.start_date instanceof Date)) {
      payload.start_date = new Date(payload.start_date);
    }
    if (payload.end_date && !(payload.end_date instanceof Date)) {
      payload.end_date = new Date(payload.end_date);
    }
    return payload;
  }
}
