import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class StatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  countComics() {
    return this.prisma.comic.count();
  }

  aggregateViews() {
    return this.prisma.stats.aggregate({ _sum: { view_count: true } });
  }

  aggregateFollows() {
    return this.prisma.stats.aggregate({ _sum: { follow_count: true } });
  }

  findTopComics(orderBy: Prisma.ComicOrderByWithRelationInput, take: number) {
    return this.prisma.comic.findMany({
      include: { stats: true },
      orderBy,
      take,
    });
  }
}
