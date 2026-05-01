import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { FollowFilter, FollowRepository } from '../../repositories/follow.repository';

@Injectable()
export class UserFollowService {
  constructor(
    private readonly followRepo: FollowRepository,
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
    const existing = await this.followRepo.findUnique(userId, comicId);
    if (existing) throw new ConflictException('Already following');

    const follow = await this.followRepo.create(userId, comicId);
    await this.followRepo.syncFollowCount(comicId);

    if (this.config.get<boolean>('kafka.enabled')) {
      await this.followRepo.createOutbox('user.followed.comic', {
        user_id: Number(userId),
        comic_id: Number(comicId),
        followed_at: new Date().toISOString(),
      });
    }

    return follow;
  }

  async unfollow(userId: any, comicId: any) {
    const existing = await this.followRepo.findUnique(userId, comicId);
    if (!existing) throw new NotFoundException('Not following');

    await this.followRepo.delete(userId, comicId);
    await this.followRepo.syncFollowCount(comicId);

    if (this.config.get<boolean>('kafka.enabled')) {
      await this.followRepo.createOutbox('user.unfollowed.comic', {
        user_id: Number(userId),
        comic_id: Number(comicId),
      });
    }

    return { success: true };
  }
}
