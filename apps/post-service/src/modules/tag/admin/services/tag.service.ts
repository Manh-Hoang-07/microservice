import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { TagFilter, TagRepository } from '../../repositories/tag.repository';

@Injectable()
export class AdminTagService {
  constructor(
    private readonly tagRepo: TagRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: TagFilter = {};
    if (query.search) filter.search = query.search;
    if (query.is_active !== undefined) {
      filter.is_active = query.is_active === 'true' || query.is_active === true;
    }

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.tagRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.tagRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const tag = await this.tagRepo.findById(id);
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async create(dto: CreateTagDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.tagRepo.findBySlug(filter.slug),
    });

    const result = await this.tagRepo.create({ ...dto, slug });
    await this.invalidateTagCache();
    return result;
  }

  async update(id: any, dto: UpdateTagDto) {
    await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    if (dto.name) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.name,
        { findOne: (filter: any) => this.tagRepo.findBySlug(filter.slug) },
        id,
      );
    }

    const result = await this.tagRepo.update(id, data);
    await this.invalidateTagCache();
    return result;
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.tagRepo.delete(id);
    await this.invalidateTagCache();
    return { success: true };
  }

  private async invalidateTagCache(): Promise<void> {
    try {
      if (this.redis?.isEnabled()) {
        await this.redis.del('post:public:tags:list');
      }
    } catch {}
  }
}
