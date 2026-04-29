import { Module } from '@nestjs/common';
import { AdminCountryModule } from './admin/country.module';
import { PublicCountryModule } from './public/country.module';
import { CountryRepositoryModule } from './country.repository.module';

@Module({
  imports: [CountryRepositoryModule, AdminCountryModule, PublicCountryModule],
})
export class CountryModule {}
