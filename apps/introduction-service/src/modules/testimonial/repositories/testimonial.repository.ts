import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

const PROJECT_SELECT = { id: true, name: true, slug: true } as const;

@Injectable()
export class TestimonialRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.TestimonialWhereInput, options: { skip: number; take: number }) {
    return this.prisma.testimonial.findMany({
      where,
      include: { project: { select: PROJECT_SELECT } },
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.TestimonialWhereInput) {
    return this.prisma.testimonial.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.testimonial.findUnique({
      where: { id },
      include: { project: { select: PROJECT_SELECT } },
    });
  }

  findFirst(where: Prisma.TestimonialWhereInput) {
    return this.prisma.testimonial.findFirst({
      where,
      include: { project: { select: PROJECT_SELECT } },
    });
  }

  create(data: Prisma.TestimonialCreateInput) {
    return this.prisma.testimonial.create({
      data,
      include: { project: { select: PROJECT_SELECT } },
    });
  }

  update(id: PrimaryKey, data: Prisma.TestimonialUpdateInput) {
    return this.prisma.testimonial.update({
      where: { id },
      data,
      include: { project: { select: PROJECT_SELECT } },
    });
  }

  delete(id: PrimaryKey) {
    return this.prisma.testimonial.delete({ where: { id } });
  }
}
