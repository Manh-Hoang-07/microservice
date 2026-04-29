import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostCategoryDto } from '../dtos/create-post-category.dto';
import { UpdatePostCategoryDto } from '../dtos/update-post-category.dto';
import { SlugHelper, createPaginationMeta } from '@package/common';
import { PostCategoryRepository } from '../../repositories/post-category.repository';

@Injectable()
export class AdminPostCategoryService {
  constructor(private readonly categoryRepo: PostCategoryRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }
    if (query.parent_id !== undefined) {
      where.parent_id = query.parent_id === 'null' ? null : BigInt(query.parent_id);
    }

    const [data, total] = await Promise.all([
      this.categoryRepo.findMany(where, { skip, take: limit }),
      this.categoryRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
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

  async update(id: bigint, dto: UpdatePostCategoryDto) {
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

  async delete(id: bigint) {
    await this.getOne(id);
    await this.categoryRepo.delete(id);
    return { success: true };
  }
}
