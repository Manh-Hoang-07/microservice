import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostTagDto } from '../dtos/create-post-tag.dto';
import { UpdatePostTagDto } from '../dtos/update-post-tag.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { PostTagRepository } from '../../repositories/post-tag.repository';

@Injectable()
export class AdminPostTagService {
  constructor(private readonly tagRepo: PostTagRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};

    const [data, total] = await Promise.all([
      this.tagRepo.findMany(where, options),
      this.tagRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const tag = await this.tagRepo.findById(id);
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async create(dto: CreatePostTagDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.tagRepo.findFirst(filter),
    });

    return this.tagRepo.create({
      name: dto.name,
      slug,
      description: dto.description,
      is_active: dto.is_active ?? true,
    });
  }

  async update(id: PrimaryKey, dto: UpdatePostTagDto) {
    await this.getOne(id);
    const data: any = { ...dto };

    if (dto.name) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.name,
        { findOne: (filter: any) => this.tagRepo.findFirst(filter) },
        id,
      );
    }

    return this.tagRepo.update(id, data);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.tagRepo.delete(id);
    return { success: true };
  }
}
