import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { StaffRepository } from '../../repositories/staff.repository';

@Injectable()
export class PublicStaffService {
  constructor(private readonly staffRepo: StaffRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'active' };
    if (query.department) where.department = query.department;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { position: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.staffRepo.findMany(where, { skip, take: limit }),
      this.staffRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.staffRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('Staff not found');
    return item;
  }
}
