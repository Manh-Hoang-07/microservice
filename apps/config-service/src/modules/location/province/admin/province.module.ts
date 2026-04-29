import { Module } from '@nestjs/common';
import { AdminProvinceController } from './controllers/province.controller';
import { ProvinceService } from './services/province.service';

@Module({
  controllers: [AdminProvinceController],
  providers: [ProvinceService],
  exports: [ProvinceService],
})
export class AdminProvinceModule {}
