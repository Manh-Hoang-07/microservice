import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { toPrimaryKey, PrimaryKey } from 'src/types';
import { TestimonialRepository } from '../../repositories/testimonial.repository';

@Injectable()
export class PublicTestimonialService {
  constructor(private readonly testimonialRepo: TestimonialRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: 'active' };
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
    const item = await this.testimonialRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }
}
