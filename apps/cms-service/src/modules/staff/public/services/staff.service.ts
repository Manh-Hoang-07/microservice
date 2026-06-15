import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CachedService, RedisService } from '@package/redis';
import { StaffFilter, StaffRepository } from '../../repositories/staff.repository';
import { BasicStatus } from '../../../../common/enums/status.enum';

@Injectable()
export class PublicStaffService extends CachedService {
  protected readonly cacheEntity = 'staff';
  protected readonly cacheNamespace = 'cms:public';

  constructor(
    private readonly staffRepo: StaffRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: StaffFilter = { status: BasicStatus.active };
    if (query.department) filter.department = query.department;

    return this.cachedList(filter, options, 300, async () => {
      const [data, total] = await Promise.all([
        this.staffRepo.findMany(filter, options),
        this.staffRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: PrimaryKey) {
    return this.cachedDetail(id.toString(), 600, async () => {
      const item = await this.staffRepo.findActiveById(id);
      if (!item) throw new NotFoundException('Staff not found');
      return item;
    });
  }
}
