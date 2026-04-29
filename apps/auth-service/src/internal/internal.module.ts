import { Module } from '@nestjs/common';
import { InternalUsersController } from './controllers/users.controller';
import { InternalRbacController } from './controllers/rbac-check.controller';
import { InternalGuard } from '../guards/internal.guard';

@Module({
  controllers: [InternalUsersController, InternalRbacController],
  providers: [InternalGuard],
})
export class InternalModule {}
