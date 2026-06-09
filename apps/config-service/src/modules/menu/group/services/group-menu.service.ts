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
    const membership = await this.iamClient.getGroupMembership(userId, groupId);

    if (!membership.isMember) {
      throw new ForbiddenException('Bạn không phải thành viên của nhóm này.');
    }

    // Build a synthetic permission set from membership status.
    // Menu items use requiredPermissionCode = 'group.member' (all members)
    // or 'group.owner' (owners only).
    const permissions = new Set<string>(['group.member']);
    if (membership.isOwner) permissions.add('group.owner');

    const dbFilter: MenuFilter = { status: BasicStatus.active, group: 'group' };
    const allMenus = await this.menuRepo.findAllWithChildren(dbFilter);
    const visible = allMenus.filter((m: any) => m.showInMenu);
    const filtered = filterUserMenus(visible, permissions);
    return buildMenuTree(filtered);
  }
}
