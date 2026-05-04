import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey, PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

type Tx = Prisma.TransactionClient | PrismaService;

export interface FollowFilter {
  user_id?: any;
  comic_id?: any;
}

@Injectable()
export class FollowRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: FollowFilter): Prisma.FollowWhereInput {
    const where: Prisma.FollowWhereInput = {};
    if (filter.user_id !== undefined) where.user_id = toPrimaryKey(filter.user_id);
    if (filter.comic_id !== undefined) where.comic_id = toPrimaryKey(filter.comic_id);
    return where;
  }

  findMany(filter: FollowFilter, options: { skip: number; take: number }) {
    return this.prisma.follow.findMany({
      where: this.buildWhere(filter),
      include: {
        comic: { select: { id: true, title: true, slug: true, cover_image: true, stats: true } },
      },
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: FollowFilter) {
    return this.prisma.follow.count({ where: this.buildWhere(filter) });
  }

  findUnique(userId: any, comicId: any, tx?: Tx) {
    const client = tx ?? this.prisma;
    return client.follow.findUnique({
      where: { user_id_comic_id: { user_id: toPrimaryKey(userId), comic_id: toPrimaryKey(comicId) } },
    });
  }

  create(userId: any, comicId: any, tx?: Tx) {
    const client = tx ?? this.prisma;
    return client.follow.create({
      data: { user_id: toPrimaryKey(userId), comic_id: toPrimaryKey(comicId) },
    });
  }

  delete(userId: any, comicId: any, tx?: Tx) {
    const client = tx ?? this.prisma;
    return client.follow.delete({
      where: { user_id_comic_id: { user_id: toPrimaryKey(userId), comic_id: toPrimaryKey(comicId) } },
    });
  }

  incrementFollowCount(comicId: PrimaryKey, tx?: Tx) {
    const client = tx ?? this.prisma;
    return client.stats.upsert({
      where: { comic_id: comicId },
      create: { comic_id: comicId, follow_count: BigInt(1) },
      update: { follow_count: { increment: 1 } },
    });
  }

  decrementFollowCount(comicId: PrimaryKey, tx?: Tx) {
    const client = tx ?? this.prisma;
    return client.stats.upsert({
      where: { comic_id: comicId },
      create: { comic_id: comicId, follow_count: BigInt(0) },
      update: { follow_count: { decrement: 1 } },
    });
  }

  async syncFollowCount(comicId: any) {
    const cid = toPrimaryKey(comicId);
    const count = await this.prisma.follow.count({ where: { comic_id: cid } });
    return this.prisma.stats.upsert({
      where: { comic_id: cid },
      create: { comic_id: cid, follow_count: BigInt(count) },
      update: { follow_count: BigInt(count) },
    });
  }

  createOutbox(event_type: string, payload: Record<string, any>, tx?: Tx) {
    const client = tx ?? this.prisma;
    return client.outbox.create({ data: { event_type, payload } });
  }

  async withTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(fn);
  }
}
