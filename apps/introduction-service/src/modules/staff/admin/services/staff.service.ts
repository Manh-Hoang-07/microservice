import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { UpdateStaffDto } from '../dtos/update-staff.dto';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class AdminStaffService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.department) where.department = query.department;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { position: { contains: query.search } },
        { department: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.staff.findMany({
        where,
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.staff.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.prisma.staff.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Staff not found');
    return item;
  }

  async create(dto: CreateStaffDto) {
    return this.prisma.staff.create({
      data: {
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
      },
    });
  }

  async update(id: bigint, dto: UpdateStaffDto) {
    await this.getOne(id);
    return this.prisma.staff.update({ where: { id }, data: dto as any });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.staff.delete({ where: { id } });
    return { success: true };
  }
}
