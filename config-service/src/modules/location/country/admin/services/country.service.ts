import { Injectable, Inject } from '@nestjs/common';
import { ICountryRepository, COUNTRY_REPOSITORY } from '../../repositories/country.repository';
import { BaseService } from '../../../../../common/core/base.service';
import { Country } from '@prisma/client';

@Injectable()
export class CountryService extends BaseService<Country, ICountryRepository> {
  constructor(
    @Inject(COUNTRY_REPOSITORY)
    protected readonly repository: ICountryRepository,
  ) {
    super(repository);
  }
}
