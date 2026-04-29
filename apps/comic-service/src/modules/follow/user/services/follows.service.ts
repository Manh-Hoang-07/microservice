import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPaginationMeta } from '@package/common';
import { ComicFollowRepository } from '../../repositories/comic-follow.repository';

@Injectable()
export class UserFollowService {
  constructor(
    private readonly followRepo: ComicFollowRepository,
    private readonly config: ConfigService,
  ) {}

  async getList(userId: bigint, query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where = { user_id: userId };

    const [data, total] = await Promise.all([
      this.followRepo.findMany(where, { skip, take: limit }),
      this.followRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async follow(userId: bigint, comicId: bigint) {
    const existing = await this.followRepo.findUnique(userId, comicId);
    if (existing) throw new ConflictException('Already following');

    const follow = await this.followRepo.create(userId, comicId);

    await this.followRepo.syncFollowCount(comicId);

    if (this.config.get<boolean>('kafka.enabled')) {
      await this.followRepo.createOutbox({
        event_type: 'user.followed.comic',
        payload: {
          user_id: Number(userId),
          comic_id: Number(comicId),
          followed_at: new Date().toISOString(),
        },
      });
    }

    return follow;
  }

  async unfollow(userId: bigint, comicId: bigint) {
    const existing = await this.followRepo.findUnique(userId, comicId);
    if (!existing) throw new NotFoundException('Not following');

    await this.followRepo.delete(userId, comicId);
    await this.followRepo.syncFollowCount(comicId);

    if (this.config.get<boolean>('kafka.enabled')) {
      await this.followRepo.createOutbox({
        event_type: 'user.unfollowed.comic',
        payload: {
          user_id: Number(userId),
          comic_id: Number(comicId),
        },
      });
    }

    return { success: true };
  }
}
