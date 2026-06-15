import { Injectable, Optional } from '@nestjs/common';
import { CachedService, RedisService } from '@package/redis';
import { MenuRepository, MenuFilter } from '../../repositories/menu.repository';
import { buildMenuTree, filterPublicMenus } from '../../helpers/menu.helper';
import { BasicStatus } from '../../enums/basic-status.enum';

@Injectable()
export class PublicMenuService extends CachedService {
  protected readonly cacheEntity = 'menu';
  protected readonly cacheNamespace = 'config:public';

  constructor(
    private readonly menuRepo: MenuRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getPublicMenuTree() {
    return this.getOrSet('config:public:menu', 600, async () => {
      const dbFilter: MenuFilter = { status: BasicStatus.active, context: 'client' };
      const allMenus = await this.menuRepo.findAllWithChildren(dbFilter);
      const visible = allMenus.filter((m: any) => m.showInMenu);
      const filtered = filterPublicMenus(visible);
      return buildMenuTree(filtered);
    });
  }
}
