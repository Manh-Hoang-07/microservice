import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { toPrimaryKey, PrimaryKey } from 'src/types';

const POST_WITH_RELATIONS = {
  stats: true,
  categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
  tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
} as const;

const PUBLIC_POST_SELECT = {
  id: true,
  slug: true,
  name: true,
  excerpt: true,
  image: true,
  cover_image: true,
  status: true,
  post_type: true,
  video_url: true,
  audio_url: true,
  is_featured: true,
  is_pinned: true,
  published_at: true,
  seo_title: true,
  seo_description: true,
  seo_keywords: true,
  created_at: true,
  updated_at: true,
  stats: true,
  categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
  tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
} as const;

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.PostWhereInput, options: { skip: number; take: number }) {
    return this.prisma.post.findMany({
      where,
      include: POST_WITH_RELATIONS,
      orderBy: { updated_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(where: Prisma.PostWhereInput, options: { skip: number; take: number }, orderBy: any) {
    return this.prisma.post.findMany({ where, select: PUBLIC_POST_SELECT, orderBy, skip: options.skip, take: options.take });
  }

  findSimpleMany(where: Prisma.PostWhereInput, take: number) {
    return this.prisma.post.findMany({
      where,
      select: { id: true, name: true, slug: true, status: true },
      orderBy: { name: 'asc' },
      take,
    });
  }

  count(where: Prisma.PostWhereInput) {
    return this.prisma.post.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.post.findUnique({ where: { id }, include: POST_WITH_RELATIONS });
  }

  findBySlug(slug: string, statuses: string[]) {
    return this.prisma.post.findFirst({
      where: { slug, status: { in: statuses } },
      include: POST_WITH_RELATIONS,
    });
  }

  findFirst(where: Prisma.PostWhereInput) {
    return this.prisma.post.findFirst({ where });
  }

  create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  createStats(postId: PrimaryKey) {
    return this.prisma.postStats.create({ data: { post_id: postId } });
  }

  async syncCategories(postId: PrimaryKey, categoryIds: number[]) {
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

  async syncTags(postId: PrimaryKey, tagIds: number[]) {
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

  update(id: PrimaryKey, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.post.delete({ where: { id } });
  }
}
