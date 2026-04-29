import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, toPrimaryKey } from '@package/common';
import { TestimonialRepository } from '../../repositories/testimonial.repository';

@Injectable()
export class PublicTestimonialService {
  constructor(private readonly testimonialRepo: TestimonialRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'active' };
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }
    if (query.project_id) where.project_id = toPrimaryKey(query.project_id);
    if (query.search) {
      where.OR = [
        { client_name: { contains: query.search } },
        { client_company: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.testimonialRepo.findMany(where, { skip, take: limit }),
      this.testimonialRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.testimonialRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }
}
