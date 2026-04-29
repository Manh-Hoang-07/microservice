import { Injectable } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { ReadingHistoryRepository } from '../../repositories/reading-history.repository';

@Injectable()
export class UserReadingHistoryService {
  constructor(private readonly historyRepo: ReadingHistoryRepository) {}

  async getList(userId: bigint, query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where = { user_id: userId };

    const [data, total] = await Promise.all([
      this.historyRepo.findMany(where, { skip, take: limit }),
      this.historyRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async upsert(userId: bigint, comicId: bigint, chapterId: bigint) {
    return this.historyRepo.upsert(userId, comicId, chapterId);
  }

  async clear(userId: bigint, comicId: bigint) {
    await this.historyRepo.deleteMany({ user_id: userId, comic_id: comicId });
    return { success: true };
  }
}
