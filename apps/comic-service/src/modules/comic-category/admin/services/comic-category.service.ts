import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { SlugHelper, createPaginationMeta } from '@package/common';
import { ComicCategoryRepository } from '../../repositories/comic-category.repository';

@Injectable()
export class AdminCategoryService {
  constructor(private readonly categoryRepo: ComicCategoryRepository) {}

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

  async create(dto: CreateCategoryDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.categoryRepo.findFirst(filter),
    });

    return this.categoryRepo.create({ name: dto.name, slug, description: dto.description });
  }

  async update(id: bigint, dto: UpdateCategoryDto) {
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

  async delete(id: bigint) {
    await this.getOne(id);
    await this.categoryRepo.delete(id);
    return { success: true };
  }
}
