import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { FaqRepository } from '../../repositories/faq.repository';

@Injectable()
export class PublicFaqService {
  constructor(private readonly faqRepo: FaqRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'active' };
    if (query.search) {
      where.OR = [
        { question: { contains: query.search } },
        { answer: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.faqRepo.findMany(where, { skip, take: limit }),
      this.faqRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.faqRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('FAQ not found');
    return item;
  }

  async incrementViewCount(id: bigint) {
    const item = await this.getOne(id);
    await this.faqRepo.update(id, { view_count: { increment: 1 } });
    return { success: true, view_count: item.view_count + 1 };
  }

  async incrementHelpfulCount(id: bigint) {
    const item = await this.getOne(id);
    await this.faqRepo.update(id, { helpful_count: { increment: 1 } });
    return { success: true, helpful_count: item.helpful_count + 1 };
  }
}
