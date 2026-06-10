import { Controller, Get } from '@nestjs/common';
import { Authenticated } from '@package/common';
import { UserWorkspaceService } from '../services/user-workspace.service';

@Controller('user/workspaces')
export class UserWorkspaceController {
  constructor(private readonly service: UserWorkspaceService) {}

  @Authenticated()
  @Get()
  getWorkspaces() {
    return this.service.getWorkspaces();
  }
}
