import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { FaqRepository } from '../../repositories/faq.repository';

@Injectable()
export class PublicFaqService {
  constructor(private readonly faqRepo: FaqRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: 'active' };

    const [data, total] = await Promise.all([
      this.faqRepo.findMany(where, options),
      this.faqRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.faqRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('FAQ not found');
    return item;
  }

  async incrementViewCount(id: PrimaryKey) {
    const item = await this.getOne(id);
    await this.faqRepo.update(id, { view_count: { increment: 1 } });
    return { success: true, view_count: item.view_count + 1 };
  }

  async incrementHelpfulCount(id: PrimaryKey) {
    const item = await this.getOne(id);
    await this.faqRepo.update(id, { helpful_count: { increment: 1 } });
    return { success: true, helpful_count: item.helpful_count + 1 };
  }
}
