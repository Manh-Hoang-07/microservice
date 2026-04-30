import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ComicFollowRepository } from '../../repositories/comic-follow.repository';

@Injectable()
export class UserFollowService {
  constructor(
    private readonly followRepo: ComicFollowRepository,
    private readonly config: ConfigService,
  ) {}

  async getList(userId: PrimaryKey, query: any) {
    const options = parseQueryOptions(query);

    const where = { user_id: userId };

    const [data, total] = await Promise.all([
      this.followRepo.findMany(where, options),
      this.followRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async follow(userId: PrimaryKey, comicId: PrimaryKey) {
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

  async unfollow(userId: PrimaryKey, comicId: PrimaryKey) {
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
