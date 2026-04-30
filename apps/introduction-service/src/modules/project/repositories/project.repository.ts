import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ProjectWhereInput, options: { skip: number; take: number }) {
    return this.prisma.project.findMany({
      where,
      include: { testimonials: true },
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(where: Prisma.ProjectWhereInput, options: { skip: number; take: number }) {
    return this.prisma.project.findMany({
      where,
      include: {
        testimonials: { where: { status: 'active' }, orderBy: { sort_order: 'asc' } },
      },
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.ProjectWhereInput) {
    return this.prisma.project.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { testimonials: true },
    });
  }

  findFirst(where: Prisma.ProjectWhereInput) {
    return this.prisma.project.findFirst({ where });
  }

  findFirstPublic(where: Prisma.ProjectWhereInput) {
    return this.prisma.project.findFirst({
      where,
      include: {
        testimonials: { where: { status: 'active' }, orderBy: { sort_order: 'asc' } },
      },
    });
  }

  create(data: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({
      data,
      include: { testimonials: true },
    });
  }

  update(id: PrimaryKey, data: Prisma.ProjectUpdateInput) {
    return this.prisma.project.update({
      where: { id },
      data,
      include: { testimonials: true },
    });
  }

  increment(id: PrimaryKey, field: 'view_count') {
    return this.prisma.project.update({
      where: { id },
      data: { [field]: { increment: 1 } },
    });
  }

  delete(id: PrimaryKey) {
    return this.prisma.project.delete({ where: { id } });
  }
}
