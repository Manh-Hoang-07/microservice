import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { toPrimaryKey } from 'src/types';
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
    const uid = toPrimaryKey(userId);
    const cid = toPrimaryKey(comicId);
    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    return this.followRepo.withTransaction(async (tx) => {
      const existing = await this.followRepo.findUnique(uid, cid, tx);
      if (existing) throw new ConflictException('Already following');

      const follow = await this.followRepo.create(uid, cid, tx);
      await this.followRepo.incrementFollowCount(cid, tx);

      if (kafkaEnabled) {
        await this.followRepo.createOutbox(
          'user.followed.comic',
          {
            user_id: String(uid),
            comic_id: String(cid),
            followed_at: new Date().toISOString(),
          },
          tx,
        );
      }

      return follow;
    });
  }

  async unfollow(userId: any, comicId: any) {
    const uid = toPrimaryKey(userId);
    const cid = toPrimaryKey(comicId);
    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    return this.followRepo.withTransaction(async (tx) => {
      const existing = await this.followRepo.findUnique(uid, cid, tx);
      if (!existing) throw new NotFoundException('Not following');

      await this.followRepo.delete(uid, cid, tx);
      await this.followRepo.decrementFollowCount(cid, tx);

      if (kafkaEnabled) {
        await this.followRepo.createOutbox(
          'user.unfollowed.comic',
          {
            user_id: String(uid),
            comic_id: String(cid),
          },
          tx,
        );
      }

      return { success: true };
    });
  }
}
