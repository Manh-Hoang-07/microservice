import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { AboutSectionRepository } from '../../repositories/about-section.repository';

@Injectable()
export class PublicAboutService {
  constructor(private readonly aboutRepo: AboutSectionRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: 'active' };
    if (query.section_type) where.section_type = query.section_type;

    const [data, total] = await Promise.all([
      this.aboutRepo.findMany(where, options),
      this.aboutRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.aboutRepo.findFirst({ slug, status: 'active' });
    if (!item) throw new NotFoundException('About section not found');
    return item;
  }
}
