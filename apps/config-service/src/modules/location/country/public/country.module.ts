import { Module } from '@nestjs/common';
import { PublicCountryController } from './controllers/country.controller';
import { AdminCountryModule } from '../admin/country.module';

@Module({
  imports: [AdminCountryModule],
  controllers: [PublicCountryController],
})
export class PublicCountryModule {}
