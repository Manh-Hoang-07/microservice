import { Module } from '@nestjs/common';
import { UserMenuController } from './controllers/menu.controller';
import { UserMenuService } from './services/menu.service';
import { IamClient } from '../../../clients/iam.client';

@Module({
  controllers: [UserMenuController],
  providers: [UserMenuService, IamClient],
})
export class UserMenuModule {}
