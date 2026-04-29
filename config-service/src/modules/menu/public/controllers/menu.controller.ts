import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MenuService } from '../../admin/services/menu.service';
import { Public } from '../../../../common/permission.decorator';

@ApiTags('Menus')
@ApiBearerAuth('access-token')
@Controller()
export class PublicMenuController {
  constructor(private readonly service: MenuService) {}

  @Public()
  @Get('menus')
  async getPublicMenuTree(@Req() req: any) {
    const userId = req.user?.sub ?? req.user?.id;
    return this.service.getPublicMenuTree(userId);
  }
}
