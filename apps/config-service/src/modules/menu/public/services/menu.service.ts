import { Injectable, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { CachedService } from '../../../../cache/cached.service';
import { MenuRepository, MenuFilter } from '../../repositories/menu.repository';
import { buildMenuTree, filterPublicMenus } from '../../helpers/menu.helper';

@Injectable()
export class PublicMenuService extends CachedService {
  constructor(
    private readonly menuRepo: MenuRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getPublicMenuTree() {
    return this.getOrSet('config:public:menu', 600, async () => {
      const dbFilter: MenuFilter = { status: 'active', group: 'client' };
      const allMenus = await this.menuRepo.findAllWithChildren(dbFilter);
      const visible = allMenus.filter((m: any) => m.show_in_menu);
      const filtered = filterPublicMenus(visible);
      return buildMenuTree(filtered);
    });
  }
}
