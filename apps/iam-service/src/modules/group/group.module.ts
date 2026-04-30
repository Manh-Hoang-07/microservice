import { Module } from '@nestjs/common';
import { GroupController } from './admin/controllers/group.controller';
import { GroupService } from './admin/services/group.service';
import { GroupRepository } from './repositories/group.repository';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
})
export class GroupModule {}
