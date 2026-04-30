import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ComicCategoryRepository } from '../../repositories/comic-category.repository';

@Injectable()
export class AdminCategoryService {
  constructor(private readonly categoryRepo: ComicCategoryRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};

    const [data, total] = await Promise.all([
      this.categoryRepo.findMany(where, options),
      this.categoryRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: CreateCategoryDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.categoryRepo.findFirst(filter),
    });

    return this.categoryRepo.create({ name: dto.name, slug, description: dto.description });
  }

  async update(id: PrimaryKey, dto: UpdateCategoryDto) {
    await this.getOne(id);
    const data: any = { ...dto };

    if (dto.name) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.name,
        { findOne: (filter: any) => this.categoryRepo.findFirst(filter) },
        id,
      );
    }

    return this.categoryRepo.update(id, data);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.categoryRepo.delete(id);
    return { success: true };
  }
}
