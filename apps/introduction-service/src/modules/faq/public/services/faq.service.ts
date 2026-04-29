import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { ACTIVE_STATUS } from '../../../../common/enums';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class PublicFaqService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: ACTIVE_STATUS };
    if (query.search) {
      where.OR = [
        { question: { contains: query.search } },
        { answer: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.faq.findMany({
        where,
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.faq.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.prisma.faq.findFirst({
      where: { id, status: ACTIVE_STATUS },
    });
    if (!item) throw new NotFoundException('FAQ not found');
    return item;
  }

  async incrementViewCount(id: bigint) {
    const item = await this.getOne(id);
    await this.prisma.faq.update({
      where: { id },
      data: { view_count: { increment: 1 } },
    });
    return { success: true, view_count: item.view_count + 1 };
  }

  async incrementHelpfulCount(id: bigint) {
    const item = await this.getOne(id);
    await this.prisma.faq.update({
      where: { id },
      data: { helpful_count: { increment: 1 } },
    });
    return { success: true, helpful_count: item.helpful_count + 1 };
  }
}
