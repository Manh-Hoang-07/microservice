import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { PostRepository } from '../../repositories/post.repository';

@Injectable()
export class AdminPostService {
  constructor(private readonly postRepo: PostRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.post_type) where.post_type = query.post_type;
    if (query.is_featured !== undefined) {
      where.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }
    if (query.is_pinned !== undefined) {
      where.is_pinned = query.is_pinned === 'true' || query.is_pinned === true;
    }

    const [data, total] = await Promise.all([
      this.postRepo.findMany(where, options),
      this.postRepo.count(where),
    ]);

    return {
      data: data.map((p) => this.transform(p)),
      meta: createPaginationMeta(options, total),
    };
  }

  async getSimpleList(query: any) {
    const limit = Math.max(Number(query.limit) || 50, 1);
    const where: any = {};

    const data = await this.postRepo.findSimpleMany(where, limit);
    return { data };
  }

  async getOne(id: PrimaryKey) {
    const post = await this.postRepo.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return this.transform(post);
  }

  async create(dto: CreatePostDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.postRepo.findFirst(filter),
    });

    const post = await this.postRepo.create({
      name: dto.name,
      slug,
      excerpt: dto.excerpt,
      content: dto.content,
      image: dto.image,
      cover_image: dto.cover_image,
      status: dto.status || 'draft',
      post_type: dto.post_type || 'text',
      video_url: dto.video_url,
      audio_url: dto.audio_url,
      is_featured: dto.is_featured || false,
      is_pinned: dto.is_pinned || false,
      published_at: dto.published_at ? new Date(dto.published_at) : null,
      seo_title: dto.seo_title,
      seo_description: dto.seo_description,
      seo_keywords: dto.seo_keywords,
    });

    await this.postRepo.createStats(post.id);

    if (dto.category_ids?.length) {
      await this.postRepo.syncCategories(post.id, dto.category_ids);
    }

    if (dto.tag_ids?.length) {
      await this.postRepo.syncTags(post.id, dto.tag_ids);
    }

    return this.getOne(post.id);
  }

  async update(id: PrimaryKey, dto: UpdatePostDto) {
    await this.getOne(id);

    const data: any = { ...dto };
    delete data.category_ids;
    delete data.tag_ids;

    if (dto.name || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.name || '',
        { findOne: (filter: any) => this.postRepo.findFirst(filter) },
        id,
      );
    }

    if (dto.published_at !== undefined) {
      data.published_at = dto.published_at ? new Date(dto.published_at) : null;
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

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.postRepo.delete(id);
    return { success: true };
  }

  private transform(entity: any) {
    if (!entity) return null;
    const item = { ...entity };
    if (item.categoryLinks && Array.isArray(item.categoryLinks)) {
      item.categories = item.categoryLinks.map((l: any) => l?.category).filter(Boolean);
      item.category_ids = item.categories.map((c: any) => c.id);
      delete item.categoryLinks;
    }
    if (item.tagLinks && Array.isArray(item.tagLinks)) {
      item.tags = item.tagLinks.map((l: any) => l?.tag).filter(Boolean);
      item.tag_ids = item.tags.map((t: any) => t.id);
      delete item.tagLinks;
    }
    return item;
  }
}
