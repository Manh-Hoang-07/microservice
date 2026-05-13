import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { RedisService } from '@package/redis';
import { StaffFilter, StaffRepository } from '../../repositories/staff.repository';
import { BasicStatus } from '../../../../common/enums/status.enum';

@Injectable()
export class PublicStaffService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly staffRepo: StaffRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  private async getOrSet<T>(key: string, ttl: number, loader: () => Promise<T>): Promise<T> {
    const cached = await this.redis?.get(key).catch(() => null);
    if (cached) return JSON.parse(cached);
    const existing = this.inflight.get(key);
    if (existing) return existing;
    const promise = loader().then(async (result) => {
      this.inflight.delete(key);
      await this.redis?.set(key, JSON.stringify(result), ttl).catch(() => {});
      return result;
    }).catch((err) => {
      this.inflight.delete(key);
      throw err;
    });
    this.inflight.set(key, promise);
    return promise;
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: StaffFilter = { status: BasicStatus.active };
    if (query.department) filter.department = query.department;

    return this.getOrSet('introduction:public:staff:list', 300, async () => {
      const [data, total] = await Promise.all([
        this.staffRepo.findMany(filter, options),
        this.staffRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: PrimaryKey) {
    return this.getOrSet(`introduction:public:staff:detail:${id}`, 600, async () => {
      const item = await this.staffRepo.findActiveById(id);
      if (!item) throw new NotFoundException('Staff not found');
      return item;
    });
  }
}
