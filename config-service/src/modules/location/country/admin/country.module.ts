import { Module } from '@nestjs/common';
import { AdminCountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';

@Module({
  controllers: [AdminCountryController],
  providers: [CountryService],
  exports: [CountryService],
})
export class AdminCountryModule {}
