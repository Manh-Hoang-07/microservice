import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from 'src/types';
import { FollowFilter, FollowRepository } from '../../repositories/follow.repository';

@Injectable()
export class UserFollowService {
  constructor(
    private readonly followRepo: FollowRepository,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async getList(userId: any, query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: FollowFilter = { user_id: userId };

    const [data, total] = await Promise.all([
      this.followRepo.findMany(filter, options),
      this.followRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async follow(userId: any, comicId: any) {
    const uid = toPrimaryKey(userId);
    const cid = toPrimaryKey(comicId);
    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    // All three writes share one transaction. Previously these ran as three
    // separate Prisma calls — a crash mid-flight committed the follow but
    // skipped the counter and outbox event, drifting state.
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.follow.findUnique({
        where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
      });
      if (existing) throw new ConflictException('Already following');

      const follow = await tx.follow.create({
        data: { user_id: uid, comic_id: cid },
      });

      // Atomic counter delta — no read-modify-write race.
      await tx.stats.upsert({
        where: { comic_id: cid },
        create: { comic_id: cid, follow_count: BigInt(1) },
        update: { follow_count: { increment: 1 } },
      });

      if (kafkaEnabled) {
        await tx.outbox.create({
          data: {
            event_type: 'user.followed.comic',
            payload: {
              // Stringify BigInt — payloads > 2^53 silently corrupt as Number.
              user_id: String(uid),
              comic_id: String(cid),
              followed_at: new Date().toISOString(),
            },
          },
        });
      }

      return follow;
    });
  }

  async unfollow(userId: any, comicId: any) {
    const uid = toPrimaryKey(userId);
    const cid = toPrimaryKey(comicId);
    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.follow.findUnique({
        where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
      });
      if (!existing) throw new NotFoundException('Not following');

      await tx.follow.delete({
        where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
      });

      // Atomic decrement; clamp at 0 to avoid negative drift on inconsistent
      // historical state — Prisma `decrement` will go negative.
      await tx.stats.upsert({
        where: { comic_id: cid },
        create: { comic_id: cid, follow_count: BigInt(0) },
        update: { follow_count: { decrement: 1 } },
      });

      if (kafkaEnabled) {
        await tx.outbox.create({
          data: {
            event_type: 'user.unfollowed.comic',
            payload: {
              user_id: String(uid),
              comic_id: String(cid),
            },
          },
        });
      }

      return { success: true };
    });
  }
}
