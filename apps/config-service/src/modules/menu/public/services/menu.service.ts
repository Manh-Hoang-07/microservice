import { Injectable, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { CachedService } from '../../../../cache/cached.service';
import { MenuService } from '../../admin/services/menu.service';

@Injectable()
export class PublicMenuService extends CachedService {
  constructor(
    private readonly menuService: MenuService,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getPublicMenuTree() {
    return this.getOrSet('config:public:menu', 600, async () => {
      return this.menuService.getPublicMenuTree();
    });
  }
}
