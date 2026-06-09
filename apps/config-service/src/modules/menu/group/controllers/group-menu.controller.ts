import { Controller, Get, Query } from '@nestjs/common';
import { Authenticated, session } from '@package/common';
import { GroupMenuService } from '../services/group-menu.service';
import { IsString, Matches } from 'class-validator';

class GroupMenuQueryDto {
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'groupId must be numeric.' })
  groupId: string;
}

@Controller('group/menus')
export class GroupMenuController {
  constructor(private readonly service: GroupMenuService) {}

  @Authenticated()
  @Get()
  async getGroupMenuTree(@Query() query: GroupMenuQueryDto) {
    const ctx = session()!;
    const userId = ctx.userId ?? '';
    return this.service.getGroupMenuTree(userId, query.groupId);
  }
}
