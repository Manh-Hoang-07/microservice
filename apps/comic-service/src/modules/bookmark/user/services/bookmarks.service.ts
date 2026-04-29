import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class UserBookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(userId: bigint, query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where = { user_id: userId };

    const [data, total] = await Promise.all([
      this.prisma.bookmark.findMany({
        where,
        include: {
          chapter: {
            select: {
              id: true,
              title: true,
              chapter_index: true,
              comic: { select: { id: true, title: true, slug: true } },
            },
          },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.bookmark.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async create(userId: bigint, dto: CreateBookmarkDto) {
    return this.prisma.bookmark.create({
      data: {
        user_id: userId,
        chapter_id: BigInt(dto.chapter_id),
        page_number: dto.page_number,
      },
    });
  }

  async delete(userId: bigint, id: bigint) {
    const bookmark = await this.prisma.bookmark.findUnique({ where: { id } });
    if (!bookmark) throw new NotFoundException('Bookmark not found');
    if (bookmark.user_id !== userId) throw new ForbiddenException('Not your bookmark');
    await this.prisma.bookmark.delete({ where: { id } });
    return { success: true };
  }
}
