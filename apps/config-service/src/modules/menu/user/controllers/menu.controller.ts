import { Controller, Get, Req } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { UserMenuService } from '../services/menu.service';

@Controller()
export class UserMenuController {
  constructor(
    private readonly service: UserMenuService,
  ) {}

  @Permission('user')
  @Get('menus/user')
  async getUserMenuTree(@Req() req: any) {
    const ctx = session()!;
    const userId = ctx.userId ?? '';
    const groupId = req.headers['x-group-id'] as string | undefined;
    return this.service.getUserMenuTree(userId, groupId);
  }
}
