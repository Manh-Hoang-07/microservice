import { Controller, Get } from '@nestjs/common';
import { MenuService } from '../../admin/services/menu.service';
import { RedisService } from '@package/redis';
import { Public } from '@package/common';

@Controller()
export class PublicMenuController {
  constructor(
    private readonly service: MenuService,
    private readonly redis: RedisService,
  ) {}

  /**
   * Public menu tree — anonymous only. The previous implementation took
   * `req.user?.sub` and forwarded a `userId` truthy value, which made the
   * service return ALL non-public menus to any authenticated caller.
   * Authenticated/personalised menus should be served via an admin-side
   * endpoint that pre-resolves the caller's permission set.
   */
  @Public()
  @Get('menus')
  async getPublicMenuTree() {
    const cacheKey = 'config:public:menu';
    try {
      if (this.redis.isEnabled()) {
        const raw = await this.redis.get(cacheKey);
        if (raw) return JSON.parse(raw);
      }
    } catch {
      // silent
    }

    const result = await this.service.getPublicMenuTree();

    try {
      if (this.redis.isEnabled()) {
        await this.redis.set(
          cacheKey,
          JSON.stringify(result, (_, v) => (typeof v === 'bigint' ? Number(v) : v)),
          600,
        );
      }
    } catch {
      // silent
    }

    return result;
  }
}
