import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { SlugHelper } from '../../../../common/slug.helper';
import { createPaginationMeta, toPrimaryKey } from '../../../../common/pagination.helper';

@Injectable()
export class AdminPostService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.post_type) where.post_type = query.post_type;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }
    if (query.is_featured !== undefined) {
      where.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }
    if (query.is_pinned !== undefined) {
      where.is_pinned = query.is_pinned === 'true' || query.is_pinned === true;
    }

    const [data, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        include: {
          stats: true,
          categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
          tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
        },
        orderBy: { updated_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      data: data.map((p) => this.transform(p)),
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async getSimpleList(query: any) {
    const limit = Math.max(Number(query.limit) || 50, 1);
    const where: any = {};
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }

    const data = await this.prisma.post.findMany({
      where,
      select: { id: true, name: true, slug: true, status: true },
      orderBy: { name: 'asc' },
      take: limit,
    });

    return { data };
  }

  async getOne(id: bigint) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        stats: true,
        categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
        tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    return this.transform(post);
  }

  async create(dto: CreatePostDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.prisma.post.findFirst({ where: filter }),
    });

    const post = await this.prisma.post.create({
      data: {
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
      },
    });

    // Initialize stats
    await this.prisma.postStats.create({
      data: { post_id: post.id },
    });

    // Sync categories
    if (dto.category_ids?.length) {
      await this.syncCategories(post.id, dto.category_ids);
    }

    // Sync tags
    if (dto.tag_ids?.length) {
      await this.syncTags(post.id, dto.tag_ids);
    }

    return this.getOne(post.id);
  }

  async update(id: bigint, dto: UpdatePostDto) {
    await this.getOne(id); // check exists

    const data: any = { ...dto };
    delete data.category_ids;
    delete data.tag_ids;

    if (dto.name || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(dto.slug || dto.name || '', {
        findOne: (filter: any) => this.prisma.post.findFirst({ where: filter }),
      }, id);
    }

    if (dto.published_at !== undefined) {
      data.published_at = dto.published_at ? new Date(dto.published_at) : null;
    }

    await this.prisma.post.update({ where: { id }, data });

    if (dto.category_ids !== undefined) {
      await this.syncCategories(id, dto.category_ids);
    }

    if (dto.tag_ids !== undefined) {
      await this.syncTags(id, dto.tag_ids);
    }

    return this.getOne(id);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.post.delete({ where: { id } });
    return { success: true };
  }

  private async syncCategories(postId: bigint, categoryIds: number[]) {
    await this.prisma.postPostcategory.deleteMany({ where: { post_id: postId } });
    if (categoryIds.length > 0) {
      await this.prisma.postPostcategory.createMany({
        data: categoryIds.map((catId) => ({
          post_id: postId,
          post_category_id: toPrimaryKey(catId),
        })),
      });
    }
  }

  private async syncTags(postId: bigint, tagIds: number[]) {
    await this.prisma.postPosttag.deleteMany({ where: { post_id: postId } });
    if (tagIds.length > 0) {
      await this.prisma.postPosttag.createMany({
        data: tagIds.map((tagId) => ({
          post_id: postId,
          post_tag_id: toPrimaryKey(tagId),
        })),
      });
    }
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
