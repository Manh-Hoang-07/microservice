import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreatePostTagDto } from '../dtos/create-post-tag.dto';
import { UpdatePostTagDto } from '../dtos/update-post-tag.dto';
import { SlugHelper } from '@package/common';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class AdminPostTagService {
  constructor(private readonly prisma: PrismaService) {}

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
      this.prisma.postTag.findMany({ where, orderBy: { name: 'asc' }, skip, take: limit }),
      this.prisma.postTag.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const tag = await this.prisma.postTag.findUnique({ where: { id } });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async create(dto: CreatePostTagDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.prisma.postTag.findFirst({ where: filter }),
    });

    return this.prisma.postTag.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        is_active: dto.is_active ?? true,
      },
    });
  }

  async update(id: bigint, dto: UpdatePostTagDto) {
    await this.getOne(id);
    const data: any = { ...dto };

    if (dto.name) {
      data.slug = await SlugHelper.uniqueSlug(dto.name, {
        findOne: (filter: any) => this.prisma.postTag.findFirst({ where: filter }),
      }, id);
    }

    return this.prisma.postTag.update({ where: { id }, data });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.postTag.delete({ where: { id } });
    return { success: true };
  }
}
