import { Province } from '@prisma/client';
import { IRepository } from '../../../common/core/base.service';

export type IProvinceRepository = IRepository<Province>;

export const PROVINCE_REPOSITORY = 'IProvinceRepository';
