import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ReadingHistoryRepository } from '../../repositories/reading-history.repository';

@Injectable()
export class UserReadingHistoryService {
  constructor(private readonly historyRepo: ReadingHistoryRepository) {}

  async getList(userId: PrimaryKey, query: any) {
    const options = parseQueryOptions(query);

    const where = { user_id: userId };

    const [data, total] = await Promise.all([
      this.historyRepo.findMany(where, options),
      this.historyRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async upsert(userId: PrimaryKey, comicId: PrimaryKey, chapterId: PrimaryKey) {
    return this.historyRepo.upsert(userId, comicId, chapterId);
  }

  async clear(userId: PrimaryKey, comicId: PrimaryKey) {
    await this.historyRepo.deleteMany({ user_id: userId, comic_id: comicId });
    return { success: true };
  }
}
