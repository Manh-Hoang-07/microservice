import { Module } from '@nestjs/common';
import { AdminProvinceModule } from './admin/province.module';
import { PublicProvinceModule } from './public/province.module';
import { ProvinceRepositoryModule } from './province.repository.module';

@Module({
  imports: [ProvinceRepositoryModule, AdminProvinceModule, PublicProvinceModule],
})
export class ProvinceModule {}
