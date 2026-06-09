import { Module } from '@nestjs/common';
import { GroupMenuController } from './controllers/group-menu.controller';
import { GroupMenuService } from './services/group-menu.service';
import { IamClient } from '../../../clients/iam.client';

@Module({
  controllers: [GroupMenuController],
  providers: [GroupMenuService, IamClient],
})
export class GroupMenuModule {}
