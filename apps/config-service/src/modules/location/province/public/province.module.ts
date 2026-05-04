import { Module } from '@nestjs/common';
import { PublicProvinceController } from './controllers/province.controller';
import { PublicProvinceService } from './services/province.service';
import { AdminProvinceModule } from '../admin/province.module';
import { AdminWardModule } from '../../ward/admin/ward.module';

@Module({
  imports: [AdminProvinceModule, AdminWardModule],
  controllers: [PublicProvinceController],
  providers: [PublicProvinceService],
})
export class PublicProvinceModule {}
