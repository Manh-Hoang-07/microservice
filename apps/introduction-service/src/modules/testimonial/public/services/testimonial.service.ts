import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { TestimonialFilter, TestimonialRepository } from '../../repositories/testimonial.repository';

@Injectable()
export class PublicTestimonialService {
  constructor(private readonly testimonialRepo: TestimonialRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: TestimonialFilter = { status: 'active' };
    if (query.featured !== undefined) {
      filter.featured = query.featured === 'true' || query.featured === true;
    }
    if (query.project_id) filter.project_id = query.project_id;

    const [data, total] = await Promise.all([
      this.testimonialRepo.findMany(filter, options),
      this.testimonialRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.testimonialRepo.findActiveById(id);
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }
}
