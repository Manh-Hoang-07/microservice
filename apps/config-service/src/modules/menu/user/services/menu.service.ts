import { Injectable } from '@nestjs/common';
import { IamClient } from '../../../../clients/iam.client';
import { MenuRepository, MenuFilter } from '../../repositories/menu.repository';
import { MenuTreeItem } from '../../interfaces/menu-tree-item.interface';
import { buildMenuTree, filterUserMenus } from '../../helpers/menu.helper';

@Injectable()
export class UserMenuService {
  constructor(
    private readonly menuRepo: MenuRepository,
    private readonly iamClient: IamClient,
  ) {}

  async getUserMenuTree(userId: string, groupId?: string): Promise<MenuTreeItem[]> {
    const userPermissions = await this.iamClient.getUserPermissions(userId, groupId);
    const dbFilter: MenuFilter = { status: 'active' };
    const allMenus = await this.menuRepo.findAllWithChildren(dbFilter);
    const visible = allMenus.filter((m: any) => m.show_in_menu);
    const filtered = filterUserMenus(visible, userPermissions);
    return buildMenuTree(filtered);
  }
}
