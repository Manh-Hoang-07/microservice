import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountryRepositoryImpl } from './country.repository.impl';
import { COUNTRY_REPOSITORY } from './country.repository';

@Module({
  controllers: [CountryController],
  providers: [
    CountryService,
    {
      provide: COUNTRY_REPOSITORY,
      useClass: CountryRepositoryImpl,
    },
  ],
  exports: [CountryService],
})
export class CountryModule {}
