import { Ward } from '@prisma/client';
import { IRepository } from '../../../../common/core/base.service';

export type IWardRepository = IRepository<Ward>;

export const WARD_REPOSITORY = 'IWardRepository';
