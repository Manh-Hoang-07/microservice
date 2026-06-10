import { Module } from '@nestjs/common';
import { UserWorkspaceController } from './user/controllers/user-workspace.controller';
import { UserWorkspaceService } from './user/services/user-workspace.service';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [GroupModule],
  controllers: [UserWorkspaceController],
  providers: [UserWorkspaceService],
})
export class UserWorkspaceModule {}
