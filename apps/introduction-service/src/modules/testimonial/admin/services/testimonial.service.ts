import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateTestimonialDto } from '../dtos/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dtos/update-testimonial.dto';
import { createPaginationMeta, toPrimaryKey } from '../../../../common/pagination.helper';

@Injectable()
export class AdminTestimonialService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }
    if (query.project_id) where.project_id = toPrimaryKey(query.project_id);
    if (query.search) {
      where.OR = [
        { client_name: { contains: query.search } },
        { client_company: { contains: query.search } },
        { content: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.testimonial.findMany({
        where,
        include: { project: { select: { id: true, name: true, slug: true } } },
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.testimonial.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.prisma.testimonial.findUnique({
      where: { id },
      include: { project: { select: { id: true, name: true, slug: true } } },
    });
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }

  async create(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({
      data: {
        client_name: dto.client_name,
        client_position: dto.client_position,
        client_company: dto.client_company,
        client_avatar: dto.client_avatar,
        content: dto.content,
        rating: dto.rating ?? 5,
        project_id: dto.project_id ? toPrimaryKey(dto.project_id) : undefined,
        featured: dto.featured ?? false,
        status: dto.status || 'active',
        sort_order: dto.sort_order ?? 0,
      },
      include: { project: { select: { id: true, name: true, slug: true } } },
    });
  }

  async update(id: bigint, dto: UpdateTestimonialDto) {
    await this.getOne(id);

    const data: any = { ...dto };
    if (dto.project_id !== undefined) {
      data.project_id = dto.project_id ? toPrimaryKey(dto.project_id) : null;
    }

    return this.prisma.testimonial.update({
      where: { id },
      data,
      include: { project: { select: { id: true, name: true, slug: true } } },
    });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.testimonial.delete({ where: { id } });
    return { success: true };
  }
}
