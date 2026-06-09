import { ForbiddenException, Injectable } from '@nestjs/common';
import { IamClient } from '../../../../clients/iam.client';
import { MenuRepository, MenuFilter } from '../../repositories/menu.repository';
import { MenuTreeItem } from '../../interfaces/menu-tree-item.interface';
import { buildMenuTree, filterUserMenus } from '../../helpers/menu.helper';
import { BasicStatus } from '../../enums/basic-status.enum';

@Injectable()
export class GroupMenuService {
  constructor(
    private readonly menuRepo: MenuRepository,
    private readonly iamClient: IamClient,
  ) {}

  async getGroupMenuTree(userId: string, groupId: string): Promise<MenuTreeItem[]> {
    // Run membership check and permission fetch concurrently
    const [membership, memberPermCodes] = await Promise.all([
      this.iamClient.getGroupMembership(userId, groupId),
      this.iamClient.getGroupMemberPermissions(userId, groupId),
    ]);

    if (!membership.isMember) {
      throw new ForbiddenException('Bạn không phải thành viên của nhóm này.');
    }

    // Synthetic set: group.member (all) + group.owner (if owner)
    // + actual permission codes from GroupMemberRole (comic.view, post.view, ...)
    const permissions = new Set<string>(['group.member', ...memberPermCodes]);
    if (membership.isOwner) permissions.add('group.owner');

    const dbFilter: MenuFilter = { status: BasicStatus.active, context: 'group' };
    const allMenus = await this.menuRepo.findAllWithChildren(dbFilter);
    const visible = allMenus.filter((m: any) => m.showInMenu);
    const filtered = filterUserMenus(visible, permissions);
    return buildMenuTree(filtered);
  }
}
