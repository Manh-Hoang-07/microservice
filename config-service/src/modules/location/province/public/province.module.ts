import { Module } from '@nestjs/common';
import { PublicProvinceController } from './controllers/province.controller';
import { AdminProvinceModule } from '../admin/province.module';

@Module({
  imports: [AdminProvinceModule],
  controllers: [PublicProvinceController],
})
export class PublicProvinceModule {}
