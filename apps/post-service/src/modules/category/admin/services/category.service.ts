import { BadRequestException, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { CategoryFilter, CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class AdminCategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  private async assertNoCycle(categoryId: any, candidateParentId: any): Promise<void> {
    if (String(categoryId) === String(candidateParentId)) {
      throw new BadRequestException('Category cannot be its own parent');
    }
    const visited = new Set<string>();
    let current: bigint | null = toPrimaryKey(candidateParentId);
    while (current != null) {
      const key = String(current);
      if (visited.has(key)) break;
      visited.add(key);
      if (key === String(categoryId)) {
        throw new BadRequestException('Setting this parent would create a category cycle');
      }
      current = await this.categoryRepo.getParentId(current);
    }
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: CategoryFilter = {};
    if (query.search) filter.search = query.search;
    if (query.parent_id !== undefined) {
      filter.parent_id = query.parent_id === 'null' ? null : query.parent_id;
    }
    if (query.is_active !== undefined) {
      filter.is_active = query.is_active === 'true' || query.is_active === true;
    }

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
    if ((dto as any).parent_id) {
      // Refuse pointing at a non-existent parent at create-time. Cycles
      // can't exist yet because the new node has no descendants.
      const parent = await this.categoryRepo.findById((dto as any).parent_id);
      if (!parent) throw new BadRequestException('Parent category not found');
    }

    const result = await this.categoryRepo.create({ ...dto, slug });
    await this.invalidateCategoryCache();
    return result;
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
    if ((dto as any).parent_id) {
      await this.assertNoCycle(id, (dto as any).parent_id);
    }

    const result = await this.categoryRepo.update(id, data);
    await this.invalidateCategoryCache();
    return result;
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.categoryRepo.delete(id);
    await this.invalidateCategoryCache();
    return { success: true };
  }

  private async invalidateCategoryCache(): Promise<void> {
    try {
      if (this.redis?.isEnabled()) {
        await this.redis.del('post:public:categories:list');
      }
    } catch {}
  }
}
