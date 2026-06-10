import { ForbiddenException, Injectable } from '@nestjs/common';
import { IamClient } from '../../../../clients/iam.client';
import { ChapterRepository } from '../../repositories/chapter.repository';
import { ChapterStatus } from '../../enums/chapter-status.enum';

@Injectable()
export class GroupChapterService {
  constructor(
    private readonly chapterRepo: ChapterRepository,
    private readonly iamClient: IamClient,
  ) {}

  async getGroupChapters(
    userId: string,
    groupId: string,
    options: { skip: number; take: number },
  ) {
    const membership = await this.iamClient.getGroupMembership(userId, groupId);
    if (!membership.isMember) {
      throw new ForbiddenException('Bạn không phải thành viên của nhóm này.');
    }

    const filter = { groupId, status: ChapterStatus.published };
    const [items, total] = await Promise.all([
      this.chapterRepo.findMany(filter, options),
      this.chapterRepo.count(filter),
    ]);

    return { items, total };
  }
}
