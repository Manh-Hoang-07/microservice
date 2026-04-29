import { Injectable, Inject } from '@nestjs/common';
import { IWardRepository, WARD_REPOSITORY } from '../../repositories/ward.repository';
import { BaseService } from '../../../../../common/core/base.service';
import { Ward } from '@prisma/client';
import { toPrimaryKey } from '../../../../../common/core/primary-key.util';

@Injectable()
export class WardService extends BaseService<Ward, IWardRepository> {
  constructor(
    @Inject(WARD_REPOSITORY)
    protected readonly repository: IWardRepository,
  ) {
    super(repository);
  }

  protected async beforeCreate(data: any): Promise<any> {
    const payload = { ...data };
    if (payload.province_id) {
      payload.province_id = toPrimaryKey(payload.province_id);
    }
    return payload;
  }

  protected async beforeUpdate(_id: any, data: any): Promise<any> {
    const payload = { ...data };
    if (payload.province_id) {
      payload.province_id = toPrimaryKey(payload.province_id);
    }
    return payload;
  }
}
