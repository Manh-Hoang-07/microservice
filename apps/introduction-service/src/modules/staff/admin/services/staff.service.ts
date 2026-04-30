import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { UpdateStaffDto } from '../dtos/update-staff.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { StaffRepository } from '../../repositories/staff.repository';

@Injectable()
export class AdminStaffService {
  constructor(private readonly staffRepo: StaffRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.department) where.department = query.department;

    const [data, total] = await Promise.all([
      this.staffRepo.findMany(where, options),
      this.staffRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.staffRepo.findById(id);
    if (!item) throw new NotFoundException('Staff not found');
    return item;
  }

  async create(dto: CreateStaffDto) {
    return this.staffRepo.create({
      name: dto.name,
      position: dto.position,
      department: dto.department,
      bio: dto.bio,
      avatar: dto.avatar,
      email: dto.email,
      phone: dto.phone,
      social_links: dto.social_links ?? {},
      experience: dto.experience,
      expertise: dto.expertise,
      status: dto.status || 'active',
      sort_order: dto.sort_order ?? 0,
    });
  }

  async update(id: PrimaryKey, dto: UpdateStaffDto) {
    await this.getOne(id);
    return this.staffRepo.update(id, dto as any);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.staffRepo.delete(id);
    return { success: true };
  }
}
