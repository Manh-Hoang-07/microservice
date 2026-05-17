import { Controller, Get } from '@nestjs/common';
import { Authenticated } from '@package/common';
import { UserGroupService } from '../services/user-group.service';

@Controller('user/groups')
export class UserGroupController {
  constructor(private readonly service: UserGroupService) {}

  @Authenticated()
  @Get()
  getUserGroups() {
    return this.service.getList({});
  }
}
