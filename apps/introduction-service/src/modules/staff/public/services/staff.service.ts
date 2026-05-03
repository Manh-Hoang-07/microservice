import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { StaffFilter, StaffRepository } from '../../repositories/staff.repository';

@Injectable()
export class PublicStaffService {
  constructor(private readonly staffRepo: StaffRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: StaffFilter = { status: 'active' };
    if (query.department) filter.department = query.department;

    const [data, total] = await Promise.all([
      this.staffRepo.findMany(filter, options),
      this.staffRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.staffRepo.findActiveById(id);
    if (!item) throw new NotFoundException('Staff not found');
    return item;
  }
}
