import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostCategoryDto } from '../dtos/create-post-category.dto';
import { UpdatePostCategoryDto } from '../dtos/update-post-category.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { PostCategoryRepository } from '../../repositories/post-category.repository';

@Injectable()
export class AdminPostCategoryService {
  constructor(private readonly categoryRepo: PostCategoryRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.parent_id !== undefined) {
      where.parent_id = query.parent_id === 'null' ? null : BigInt(query.parent_id);
    }

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

  async create(dto: CreatePostCategoryDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.categoryRepo.findFirst(filter),
    });

    return this.categoryRepo.create({
      name: dto.name,
      slug,
      description: dto.description,
      parent_id: dto.parent_id ? BigInt(dto.parent_id) : null,
      is_active: dto.is_active ?? true,
      sort_order: dto.sort_order ?? 0,
      seo_title: dto.seo_title,
      seo_description: dto.seo_description,
      seo_keywords: dto.seo_keywords,
    });
  }

  async update(id: PrimaryKey, dto: UpdatePostCategoryDto) {
    await this.getOne(id);
    const data: any = { ...dto };

    if (dto.parent_id !== undefined) {
      data.parent_id = dto.parent_id ? BigInt(dto.parent_id) : null;
    }

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
