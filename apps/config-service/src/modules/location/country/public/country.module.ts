import { Module } from '@nestjs/common';
import { PublicCountryController } from './controllers/country.controller';
import { AdminCountryModule } from '../admin/country.module';
import { AdminProvinceModule } from '../../province/admin/province.module';

@Module({
  imports: [AdminCountryModule, AdminProvinceModule],
  controllers: [PublicCountryController],
})
export class PublicCountryModule {}
