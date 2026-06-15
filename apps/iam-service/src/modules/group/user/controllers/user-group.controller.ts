import { Controller, Get, Query } from '@nestjs/common';
import { Authenticated, BaseListQueryDto } from '@package/common';
import { UserGroupService } from '../services/user-group.service';

@Controller('user/groups')
export class UserGroupController {
  constructor(private readonly service: UserGroupService) {}

  @Authenticated()
  @Get()
  getMyGroups(@Query() query: BaseListQueryDto) {
    return this.service.getList(query);
  }
}
