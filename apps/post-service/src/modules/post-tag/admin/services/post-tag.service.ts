import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostTagDto } from '../dtos/create-post-tag.dto';
import { UpdatePostTagDto } from '../dtos/update-post-tag.dto';
import { SlugHelper, createPaginationMeta } from '@package/common';
import { PostTagRepository } from '../../repositories/post-tag.repository';

@Injectable()
export class AdminPostTagService {
  constructor(private readonly tagRepo: PostTagRepository) {}

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
      this.tagRepo.findMany(where, { skip, take: limit }),
      this.tagRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
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

  async update(id: bigint, dto: UpdatePostTagDto) {
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

  async delete(id: bigint) {
    await this.getOne(id);
    await this.tagRepo.delete(id);
    return { success: true };
  }
}
