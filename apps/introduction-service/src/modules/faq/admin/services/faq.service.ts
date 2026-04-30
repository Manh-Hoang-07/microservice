import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { FaqRepository } from '../../repositories/faq.repository';

@Injectable()
export class AdminFaqService {
  constructor(private readonly faqRepo: FaqRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.faqRepo.findMany(where, options),
      this.faqRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
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

  async update(id: PrimaryKey, dto: UpdateFaqDto) {
    await this.getOne(id);
    return this.faqRepo.update(id, dto as any);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.faqRepo.delete(id);
    return { success: true };
  }
}
