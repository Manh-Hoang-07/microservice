import { ForbiddenException, Injectable } from '@nestjs/common';
import { IamClient } from '../../../../clients/iam.client';
import { ComicRepository } from '../../repositories/comic.repository';
import { ComicStatus } from '../../enums/comic-status.enum';

@Injectable()
export class GroupComicService {
  constructor(
    private readonly comicRepo: ComicRepository,
    private readonly iamClient: IamClient,
  ) {}

  async getGroupComics(
    userId: string,
    groupId: string,
    options: { skip: number; take: number },
  ) {
    const membership = await this.iamClient.getGroupMembership(userId, groupId);
    if (!membership.isMember) {
      throw new ForbiddenException('Bạn không phải thành viên của nhóm này.');
    }

    const filter = { groupId, status: ComicStatus.published };
    const [items, total] = await Promise.all([
      this.comicRepo.findMany(filter, options),
      this.comicRepo.count(filter),
    ]);

    return { items, total };
  }
}
