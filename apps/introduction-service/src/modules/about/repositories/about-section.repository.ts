import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface AboutSectionFilter {
  search?: string;
  status?: string;
  section_type?: string;
  slug?: string;
}

@Injectable()
export class AboutSectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: AboutSectionFilter): Prisma.AboutSectionWhereInput {
    const where: Prisma.AboutSectionWhereInput = {};
    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search } },
        { slug: { contains: filter.search } },
      ];
    }
    if (filter.status) where.status = filter.status;
    if (filter.section_type) where.section_type = filter.section_type;
    if (filter.slug) where.slug = filter.slug;
    return where;
  }

  findMany(filter: AboutSectionFilter, options: { skip: number; take: number }) {
    return this.prisma.aboutSection.findMany({
      where: this.buildWhere(filter),
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: AboutSectionFilter) {
    return this.prisma.aboutSection.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.aboutSection.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  findBySlug(slug: string) {
    return this.prisma.aboutSection.findUnique({ where: { slug } });
  }

  findActiveBySlug(slug: string) {
    return this.prisma.aboutSection.findFirst({ where: { slug, status: 'active' } });
  }

  create(data: Record<string, any>) {
    return this.prisma.aboutSection.create({
      data: data as Prisma.AboutSectionUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.aboutSection.update({
      where: { id: toPrimaryKey(id) },
      data: data as Prisma.AboutSectionUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.aboutSection.delete({ where: { id: toPrimaryKey(id) } });
  }
}
