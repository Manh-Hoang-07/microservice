import { Module } from '@nestjs/common';
import { InternalUsersController } from './controllers/users.controller';
import { InternalRbacController } from './controllers/rbac-check.controller';
import { InternalGuard } from '@package/common';

@Module({
  controllers: [InternalUsersController, InternalRbacController],
  providers: [InternalGuard],
})
export class InternalModule {}
