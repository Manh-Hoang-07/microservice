import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateAboutDto } from '../dtos/create-about.dto';
import { UpdateAboutDto } from '../dtos/update-about.dto';
import { SlugHelper } from '@package/common';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class AdminAboutService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.section_type) where.section_type = query.section_type;
    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.aboutSection.findMany({
        where,
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.aboutSection.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.prisma.aboutSection.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('About section not found');
    return item;
  }

  async create(dto: CreateAboutDto) {
    const slug = await SlugHelper.uniqueSlug(dto.slug || dto.title, {
      findOne: (filter: any) => this.prisma.aboutSection.findFirst({ where: filter }),
    });

    return this.prisma.aboutSection.create({
      data: {
        title: dto.title,
        slug,
        content: dto.content,
        image: dto.image,
        video_url: dto.video_url,
        section_type: dto.section_type || 'general',
        status: dto.status || 'active',
        sort_order: dto.sort_order ?? 0,
      },
    });
  }

  async update(id: bigint, dto: UpdateAboutDto) {
    await this.getOne(id);

    const data: any = { ...dto };

    if (dto.title || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(dto.slug || dto.title || '', {
        findOne: (filter: any) => this.prisma.aboutSection.findFirst({ where: filter }),
      }, id);
    }

    return this.prisma.aboutSection.update({ where: { id }, data });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.aboutSection.delete({ where: { id } });
    return { success: true };
  }
}
