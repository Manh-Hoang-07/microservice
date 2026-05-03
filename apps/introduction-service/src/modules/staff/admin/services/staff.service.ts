import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { UpdateStaffDto } from '../dtos/update-staff.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { StaffFilter, StaffRepository } from '../../repositories/staff.repository';

@Injectable()
export class AdminStaffService {
  constructor(private readonly staffRepo: StaffRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: StaffFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.department) filter.department = query.department;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.staffRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.staffRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.staffRepo.findById(id);
    if (!item) throw new NotFoundException('Staff not found');
    return item;
  }

  async create(dto: CreateStaffDto) {
    return this.staffRepo.create({
      ...dto,
      social_links: dto.social_links ?? {},
      status: dto.status || 'active',
      sort_order: dto.sort_order ?? 0,
    });
  }

  async update(id: any, dto: UpdateStaffDto) {
    await this.getOne(id);
    return this.staffRepo.update(id, dto);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.staffRepo.delete(id);
    return { success: true };
  }
}
