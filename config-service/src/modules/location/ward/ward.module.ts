import { Module } from '@nestjs/common';
import { AdminWardModule } from './admin/ward.module';
import { PublicWardModule } from './public/ward.module';
import { WardRepositoryModule } from './ward.repository.module';

@Module({
  imports: [WardRepositoryModule, AdminWardModule, PublicWardModule],
})
export class WardModule {}
