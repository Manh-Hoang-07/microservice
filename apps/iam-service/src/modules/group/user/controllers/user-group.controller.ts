import { Controller, Get } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { UserGroupService } from '../services/user-group.service';

@Controller('user/groups')
export class UserGroupController {
  constructor(private readonly service: UserGroupService) {}

  @Permission('user')
  @Get()
  getUserGroups() {
    const ctx = session()!;
    return this.service.getUserGroups(ctx.userId ?? '');
  }
}
