import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { StaffRepository } from '../../repositories/staff.repository';

@Injectable()
export class PublicStaffService {
  constructor(private readonly staffRepo: StaffRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: 'active' };
    if (query.department) where.department = query.department;

    const [data, total] = await Promise.all([
      this.staffRepo.findMany(where, options),
      this.staffRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.staffRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('Staff not found');
    return item;
  }
}
