import { Injectable, Optional } from '@nestjs/common';
import { CachedService, RedisService } from '@package/redis';
import { IamClient } from '../../../../clients/iam.client';
import { MenuRepository, MenuFilter } from '../../repositories/menu.repository';
import { MenuTreeItem } from '../../interfaces/menu-tree-item.interface';
import { buildMenuTree, filterUserMenus } from '../../helpers/menu.helper';
import { BasicStatus } from '../../enums/basic-status.enum';

@Injectable()
export class UserMenuService extends CachedService {
  // Shares the `menu` version key with the admin MenuService, so any admin menu
  // write (which bumps that version) invalidates this cache.
  protected readonly cacheEntity = 'menu';
  protected readonly cacheNamespace = 'config:public';

  constructor(
    private readonly menuRepo: MenuRepository,
    private readonly iamClient: IamClient,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getUserMenuTree(userId: string): Promise<MenuTreeItem[]> {
    // 1. Raw admin-menu list is identical for every user — cache it (versioned,
    //    TTL 600s) so we skip the full-table query on every request.
    const visibleMenus = await this.getVisibleAdminMenus();

    // 2. Permission filtering is per-user and runs in-memory (cheap). It is NOT
    //    cached, so user A can never be served user B's filtered menu.
    const userPermissions = await this.iamClient.getUserPermissions(userId);
    const filtered = filterUserMenus(visibleMenus, userPermissions);
    return buildMenuTree(filtered);
  }

  /**
   * Cached raw list of visible (`showInMenu`) admin-context menus. Permission
   * filtering deliberately happens AFTER this, never inside the cache key, so
   * the cached payload is user-agnostic.
   */
  private getVisibleAdminMenus(): Promise<any[]> {
    const dbFilter: MenuFilter = { status: BasicStatus.active, context: 'admin' };
    return this.cachedList(dbFilter, { scope: 'admin-raw' }, 600, async () => {
      const allMenus = await this.menuRepo.findAllWithChildren(dbFilter);
      return allMenus.filter((m: any) => m.showInMenu);
    });
  }
}
