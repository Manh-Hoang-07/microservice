import { Country } from '@prisma/client';
import { IRepository } from '../../../common/core/base.service';

export type ICountryRepository = IRepository<Country>;

export const COUNTRY_REPOSITORY = 'ICountryRepository';
