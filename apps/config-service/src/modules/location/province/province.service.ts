import { Injectable, Inject } from '@nestjs/common';
import { IProvinceRepository, PROVINCE_REPOSITORY } from './province.repository';
import { BaseService } from '../../../common/core/base.service';
import { Province } from '@prisma/client';
import { toPrimaryKey } from '../../../common/core/primary-key.util';

@Injectable()
export class ProvinceService extends BaseService<Province, IProvinceRepository> {
  constructor(
    @Inject(PROVINCE_REPOSITORY)
    protected readonly repository: IProvinceRepository,
  ) {
    super(repository);
  }

  protected async beforeCreate(data: any): Promise<any> {
    const payload = { ...data };
    if (payload.country_id) {
      payload.country_id = toPrimaryKey(payload.country_id);
    }
    return payload;
  }

  protected async beforeUpdate(_id: any, data: any): Promise<any> {
    const payload = { ...data };
    if (payload.country_id) {
      payload.country_id = toPrimaryKey(payload.country_id);
    }
    return payload;
  }
}
