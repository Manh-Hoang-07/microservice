import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ComicStatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  countComics() {
    return this.prisma.comic.count();
  }

  aggregateViews() {
    return this.prisma.comicStats.aggregate({ _sum: { view_count: true } });
  }

  aggregateFollows() {
    return this.prisma.comicStats.aggregate({ _sum: { follow_count: true } });
  }

  findTopComics(orderBy: any, take: number) {
    return this.prisma.comic.findMany({
      include: { stats: true },
      orderBy,
      take,
    });
  }
}
