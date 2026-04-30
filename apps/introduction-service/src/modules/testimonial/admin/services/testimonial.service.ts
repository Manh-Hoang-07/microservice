import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonialDto } from '../dtos/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dtos/update-testimonial.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { toPrimaryKey, PrimaryKey } from 'src/types';
import { TestimonialRepository } from '../../repositories/testimonial.repository';

@Injectable()
export class AdminTestimonialService {
  constructor(private readonly testimonialRepo: TestimonialRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }
    if (query.project_id) where.project_id = toPrimaryKey(query.project_id);

    const [data, total] = await Promise.all([
      this.testimonialRepo.findMany(where, options),
      this.testimonialRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.testimonialRepo.findById(id);
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }

  async create(dto: CreateTestimonialDto) {
    return this.testimonialRepo.create({
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
    } as any);
  }

  async update(id: PrimaryKey, dto: UpdateTestimonialDto) {
    await this.getOne(id);

    const data: any = { ...dto };
    if (dto.project_id !== undefined) {
      data.project_id = dto.project_id ? toPrimaryKey(dto.project_id) : null;
    }

    return this.testimonialRepo.update(id, data);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.testimonialRepo.delete(id);
    return { success: true };
  }
}
