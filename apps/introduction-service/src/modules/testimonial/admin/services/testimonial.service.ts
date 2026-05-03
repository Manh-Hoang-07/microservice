import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonialDto } from '../dtos/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dtos/update-testimonial.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { TestimonialFilter, TestimonialRepository } from '../../repositories/testimonial.repository';

@Injectable()
export class AdminTestimonialService {
  constructor(private readonly testimonialRepo: TestimonialRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: TestimonialFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.featured !== undefined) {
      filter.featured = query.featured === 'true' || query.featured === true;
    }
    if (query.project_id) filter.project_id = query.project_id;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.testimonialRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.testimonialRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.testimonialRepo.findById(id);
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }

  async create(dto: CreateTestimonialDto) {
    return this.testimonialRepo.create({
      ...dto,
      rating: dto.rating ?? 5,
      featured: dto.featured ?? false,
      status: dto.status || 'active',
      sort_order: dto.sort_order ?? 0,
    });
  }

  async update(id: any, dto: UpdateTestimonialDto) {
    await this.getOne(id);
    return this.testimonialRepo.update(id, dto);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.testimonialRepo.delete(id);
    return { success: true };
  }
}
