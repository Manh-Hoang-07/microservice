import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { AboutSectionFilter, AboutSectionRepository } from '../../repositories/about-section.repository';

@Injectable()
export class PublicAboutService {
  constructor(private readonly aboutRepo: AboutSectionRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: AboutSectionFilter = { status: 'active' };
    if (query.section_type) filter.section_type = query.section_type;

    const [data, total] = await Promise.all([
      this.aboutRepo.findMany(filter, options),
      this.aboutRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.aboutRepo.findActiveBySlug(slug);
    if (!item) throw new NotFoundException('About section not found');
    return item;
  }
}
