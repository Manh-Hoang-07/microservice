import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutDto } from '../dtos/create-about.dto';
import { UpdateAboutDto } from '../dtos/update-about.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { AboutSectionFilter, AboutSectionRepository } from '../../repositories/about-section.repository';

@Injectable()
export class AdminAboutService {
  constructor(private readonly aboutRepo: AboutSectionRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: AboutSectionFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.section_type) filter.section_type = query.section_type;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.aboutRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.aboutRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.aboutRepo.findById(id);
    if (!item) throw new NotFoundException('About section not found');
    return item;
  }

  async create(dto: CreateAboutDto) {
    const slug = await SlugHelper.uniqueSlug(dto.slug || dto.title, {
      findOne: (filter: any) => this.aboutRepo.findBySlug(filter.slug),
    });

    return this.aboutRepo.create({ ...dto, slug });
  }

  async update(id: any, dto: UpdateAboutDto) {
    await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    if (dto.title || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.title || '',
        { findOne: (filter: any) => this.aboutRepo.findBySlug(filter.slug) },
        id,
      );
    }

    return this.aboutRepo.update(id, data);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.aboutRepo.delete(id);
    return { success: true };
  }
}
