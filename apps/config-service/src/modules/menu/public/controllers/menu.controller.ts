import { Controller, Get } from '@nestjs/common';
import { MenuService } from '../../admin/services/menu.service';
import { Public } from '@package/common';

@Controller()
export class PublicMenuController {
  constructor(private readonly service: MenuService) {}

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
    return this.service.getPublicMenuTree();
  }
}
