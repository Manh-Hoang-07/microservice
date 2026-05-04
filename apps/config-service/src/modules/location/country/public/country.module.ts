import { Module } from '@nestjs/common';
import { PublicCountryController } from './controllers/country.controller';
import { PublicCountryService } from './services/country.service';
import { AdminCountryModule } from '../admin/country.module';
import { AdminProvinceModule } from '../../province/admin/province.module';

@Module({
  imports: [AdminCountryModule, AdminProvinceModule],
  controllers: [PublicCountryController],
  providers: [PublicCountryService],
})
export class PublicCountryModule {}
