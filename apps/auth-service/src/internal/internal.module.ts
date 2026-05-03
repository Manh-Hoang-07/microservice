import { Module } from '@nestjs/common';
import { InternalUsersController } from './controllers/users.controller';
import { InternalGuard } from '@package/common';

@Module({
  controllers: [InternalUsersController],
  providers: [InternalGuard],
})
export class InternalModule {}
