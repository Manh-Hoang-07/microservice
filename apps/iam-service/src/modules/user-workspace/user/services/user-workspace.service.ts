import { Injectable } from '@nestjs/common';
import { getSessionUserId } from '@package/common';
import { GroupRepository } from '../../../group/repositories/group.repository';
import { RbacService } from '../../../../rbac/services/rbac.service';

const ADMIN_MENU_API = '/api/config/user/menus';

@Injectable()
export class UserWorkspaceService {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly rbacService: RbacService,
  ) {}

  async getWorkspaces(): Promise<any[]> {
    const userId = getSessionUserId();
    if (!userId) return [];

    const [permissions, memberRows] = await Promise.all([
      this.rbacService.getPermissions(userId),
      this.groupRepo.findUserGroups(userId),
    ]);

    const workspaces: any[] = [];

    if (permissions.size > 0) {
      workspaces.push({
        type: 'admin',
        name: 'Bảng điều khiển quản trị',
        menuApi: ADMIN_MENU_API,
      });
    }

    for (const row of memberRows) {
      const g = row.group;
      if (g.status !== 'active') continue;
      workspaces.push({
        type: 'group',
        id: String(g.id),
        name: g.name,
        groupType: g.type,
        isOwner: g.ownerId !== null && String(g.ownerId) === String(userId),
        menuApi: `/api/config/group/menus?groupId=${g.id}`,
      });
    }

    return workspaces;
  }
}
