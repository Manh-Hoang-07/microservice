import { Controller, Get } from '@nestjs/common';
import { Permission } from '@package/common';
import { UserGroupService } from '../services/user-group.service';

@Controller('user/groups')
export class UserGroupController {
  constructor(private readonly service: UserGroupService) {}

  @Permission('user')
  @Get()
  getUserGroups() {
    return this.service.getList({});
  }
}
