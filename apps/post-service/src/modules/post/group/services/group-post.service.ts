import { ForbiddenException, Injectable } from '@nestjs/common';
import { IamClient } from '../../../../clients/iam.client';
import { PostRepository } from '../../repositories/post.repository';
import { CategoryRepository } from '../../../category/repositories/category.repository';
import { CategoryStatus } from '../../../category/enums/category-status.enum';

@Injectable()
export class GroupPostService {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly iamClient: IamClient,
  ) {}

  async getGroupPosts(
    userId: string,
    groupId: string,
    options: { skip: number; take: number },
  ) {
    const membership = await this.iamClient.getGroupMembership(userId, groupId);
    if (!membership.isMember) {
      throw new ForbiddenException('Bạn không phải thành viên của nhóm này.');
    }

    const filter = { groupId, status: 'published' };
    const [items, total] = await Promise.all([
      this.postRepo.findMany(filter, options),
      this.postRepo.count(filter),
    ]);

    return { items, total };
  }

  async getGroupPostCategories(userId: string, groupId: string) {
    const membership = await this.iamClient.getGroupMembership(userId, groupId);
    if (!membership.isMember) {
      throw new ForbiddenException('Bạn không phải thành viên của nhóm này.');
    }

    return this.categoryRepo.findRootActiveTree();
  }
}
