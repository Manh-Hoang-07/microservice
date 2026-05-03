import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { ReadingHistoryFilter, ReadingHistoryRepository } from '../../repositories/reading-history.repository';

@Injectable()
export class UserReadingHistoryService {
  constructor(private readonly historyRepo: ReadingHistoryRepository) {}

  async getList(userId: any, query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ReadingHistoryFilter = { user_id: userId };

    const [data, total] = await Promise.all([
      this.historyRepo.findMany(filter, options),
      this.historyRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async upsert(userId: any, comicId: any, chapterId: any) {
    return this.historyRepo.upsert(userId, comicId, chapterId);
  }

  async clear(userId: any, comicId: any) {
    await this.historyRepo.deleteByUserComic({ user_id: userId, comic_id: comicId });
    return { success: true };
  }
}
