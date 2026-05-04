import { Controller, Get } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicMenuService } from '../services/menu.service';

@Controller()
export class PublicMenuController {
  constructor(private readonly service: PublicMenuService) {}

  @Public()
  @Get('menus')
  async getPublicMenuTree() {
    return this.service.getPublicMenuTree();
  }
}
