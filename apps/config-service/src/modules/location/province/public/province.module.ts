import { Module } from '@nestjs/common';
import { PublicProvinceController } from './controllers/province.controller';
import { AdminProvinceModule } from '../admin/province.module';
import { AdminWardModule } from '../../ward/admin/ward.module';

@Module({
  imports: [AdminProvinceModule, AdminWardModule],
  controllers: [PublicProvinceController],
})
export class PublicProvinceModule {}
