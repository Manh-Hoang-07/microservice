import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
import { createPaginationMeta } from '@package/common';
import { FaqRepository } from '../../repositories/faq.repository';

@Injectable()
export class AdminFaqService {
  constructor(private readonly faqRepo: FaqRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
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

  async update(id: bigint, dto: UpdateFaqDto) {
    await this.getOne(id);
    return this.faqRepo.update(id, dto as any);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.faqRepo.delete(id);
    return { success: true };
  }
}
