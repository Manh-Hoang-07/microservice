import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class UserFollowService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async getList(userId: bigint, query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where = { user_id: userId };

    const [data, total] = await Promise.all([
      this.prisma.comicFollow.findMany({
        where,
        include: {
          comic: {
            select: { id: true, title: true, slug: true, cover_image: true, stats: true },
          },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.comicFollow.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async follow(userId: bigint, comicId: bigint) {
    // Check if already following
    const existing = await this.prisma.comicFollow.findUnique({
      where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
    });
    if (existing) throw new ConflictException('Already following');

    const follow = await this.prisma.comicFollow.create({
      data: { user_id: userId, comic_id: comicId },
    });

    // Sync follow count
    await this.syncFollowCount(comicId);

    // Write outbox event
    if (this.config.get<boolean>('kafka.enabled')) {
      await this.prisma.comicOutbox.create({
        data: {
          event_type: 'user.followed.comic',
          payload: {
            user_id: Number(userId),
            comic_id: Number(comicId),
            followed_at: new Date().toISOString(),
          },
        },
      });
    }

    return follow;
  }

  async unfollow(userId: bigint, comicId: bigint) {
    const existing = await this.prisma.comicFollow.findUnique({
      where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
    });
    if (!existing) throw new NotFoundException('Not following');

    await this.prisma.comicFollow.delete({
      where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
    });

    await this.syncFollowCount(comicId);

    if (this.config.get<boolean>('kafka.enabled')) {
      await this.prisma.comicOutbox.create({
        data: {
          event_type: 'user.unfollowed.comic',
          payload: {
            user_id: Number(userId),
            comic_id: Number(comicId),
          },
        },
      });
    }

    return { success: true };
  }

  private async syncFollowCount(comicId: bigint) {
    const count = await this.prisma.comicFollow.count({ where: { comic_id: comicId } });
    await this.prisma.comicStats.upsert({
      where: { comic_id: comicId },
      create: { comic_id: comicId, follow_count: BigInt(count) },
      update: { follow_count: BigInt(count) },
    });
  }
}
