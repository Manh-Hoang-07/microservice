import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { PostFilter, PostRepository } from '../../repositories/post.repository';

@Injectable()
export class AdminPostService {
  constructor(private readonly postRepo: PostRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter = this.buildFilter(query);

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.postRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.postRepo.count(filter),
    ]);

    return {
      data: data.map((p) => this.transform(p)),
      meta: createPaginationMeta(options, total),
    };
  }

  async getSimpleList(query: any = {}) {
    const limit = Math.max(Number(query.limit) || 50, 1);
    const filter = this.buildFilter(query);
    const data = await this.postRepo.findSimpleMany(filter, limit);
    return { data };
  }

  async getOne(id: any) {
    const post = await this.postRepo.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return this.transform(post);
  }

  async create(dto: CreatePostDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.postRepo.findBySlugSimple(filter.slug),
    });

    const post = await this.postRepo.create({ ...dto, slug });
    await this.postRepo.createStats(post.id);

    if (dto.category_ids?.length) {
      await this.postRepo.syncCategories(post.id, dto.category_ids);
    }
    if (dto.tag_ids?.length) {
      await this.postRepo.syncTags(post.id, dto.tag_ids);
    }

    return this.getOne(post.id);
  }

  async update(id: any, dto: UpdatePostDto) {
    await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    if (dto.name || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.name || '',
        { findOne: (filter: any) => this.postRepo.findBySlugSimple(filter.slug) },
        id,
      );
    }

    await this.postRepo.update(id, data);

    if (dto.category_ids !== undefined) {
      await this.postRepo.syncCategories(id, dto.category_ids);
    }
    if (dto.tag_ids !== undefined) {
      await this.postRepo.syncTags(id, dto.tag_ids);
    }

    return this.getOne(id);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.postRepo.delete(id);
    return { success: true };
  }

  private buildFilter(query: any): PostFilter {
    const filter: PostFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.post_type) filter.post_type = query.post_type;
    if (query.is_featured !== undefined) {
      filter.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }
    if (query.is_pinned !== undefined) {
      filter.is_pinned = query.is_pinned === 'true' || query.is_pinned === true;
    }
    if (query.category_id) filter.category_id = query.category_id;
    if (query.tag_id) filter.tag_id = query.tag_id;
    return filter;
  }

  private transform(entity: any) {
    if (!entity) return null;
    const item = { ...entity };
    if (Array.isArray(item.categoryLinks)) {
      item.categories = item.categoryLinks.map((l: any) => l?.category).filter(Boolean);
      item.category_ids = item.categories.map((c: any) => c.id);
      delete item.categoryLinks;
    }
    if (Array.isArray(item.tagLinks)) {
      item.tags = item.tagLinks.map((l: any) => l?.tag).filter(Boolean);
      item.tag_ids = item.tags.map((t: any) => t.id);
      delete item.tagLinks;
    }
    return item;
  }
}
