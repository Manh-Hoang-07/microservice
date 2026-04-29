import { Global, Module } from '@nestjs/common';
import { COUNTRY_REPOSITORY } from './repositories/country.repository';
import { CountryRepositoryImpl } from './repositories/country.repository.impl';

@Global()
@Module({
  providers: [
    {
      provide: COUNTRY_REPOSITORY,
      useClass: CountryRepositoryImpl,
    },
  ],
  exports: [COUNTRY_REPOSITORY],
})
export class CountryRepositoryModule {}
