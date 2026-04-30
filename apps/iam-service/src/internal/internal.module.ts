import { Module } from '@nestjs/common';
import { InternalRbacController } from './controllers/rbac-check.controller';
import { InternalGuard } from '@package/common';

@Module({
  controllers: [InternalRbacController],
  providers: [InternalGuard],
})
export class InternalModule {}
