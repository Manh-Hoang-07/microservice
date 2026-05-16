import { Controller, Get } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { UserMenuService } from '../services/menu.service';

@Controller('user/menus')
export class UserMenuController {
  constructor(
    private readonly service: UserMenuService,
  ) {}

  @Permission('user')
  @Get()
  async getUserMenuTree() {
    const ctx = session()!;
    const userId = ctx.userId ?? '';
    return this.service.getUserMenuTree(userId);
  }
}
