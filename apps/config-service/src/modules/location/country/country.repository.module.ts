import { Global, Module } from '@nestjs/common';
import { CountryRepository } from './repositories/country.repository';

@Global()
@Module({
  providers: [CountryRepository],
  exports: [CountryRepository],
})
export class CountryRepositoryModule {}
