import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { FaqFilter, FaqRepository } from '../../repositories/faq.repository';

@Injectable()
export class AdminFaqService {
  constructor(private readonly faqRepo: FaqRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: FaqFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.faqRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.faqRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.faqRepo.findById(id);
    if (!item) throw new NotFoundException('FAQ not found');
    return item;
  }

  async create(dto: CreateFaqDto) {
    return this.faqRepo.create({
      question: dto.question,
      answer: dto.answer,
      status: dto.status || 'active',
      sort_order: dto.sort_order ?? 0,
    });
  }

  async update(id: any, dto: UpdateFaqDto) {
    await this.getOne(id);
    return this.faqRepo.update(id, dto);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.faqRepo.delete(id);
    return { success: true };
  }
}
