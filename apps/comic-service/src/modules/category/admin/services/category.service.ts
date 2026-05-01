import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { CategoryFilter, CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class AdminCategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: CategoryFilter = {};
    if (query.search) filter.search = query.search;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.categoryRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.categoryRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: CreateCategoryDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.categoryRepo.findBySlug(filter.slug),
    });

    return this.categoryRepo.create({ ...dto, slug });
  }

  async update(id: any, dto: UpdateCategoryDto) {
    await this.getOne(id);
    const data: Record<string, any> = { ...dto };

    if (dto.name) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.name,
        { findOne: (filter: any) => this.categoryRepo.findBySlug(filter.slug) },
        id,
      );
    }

    return this.categoryRepo.update(id, data);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.categoryRepo.delete(id);
    return { success: true };
  }
}
