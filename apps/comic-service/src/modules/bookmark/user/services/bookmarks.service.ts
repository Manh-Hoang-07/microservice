import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { BookmarkFilter, BookmarkRepository } from '../../repositories/bookmark.repository';

@Injectable()
export class UserBookmarkService {
  constructor(private readonly bookmarkRepo: BookmarkRepository) {}

  async getList(userId: any, query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: BookmarkFilter = { user_id: userId };
    if (query.chapter_id) filter.chapter_id = query.chapter_id;

    const [data, total] = await Promise.all([
      this.bookmarkRepo.findMany(filter, options),
      this.bookmarkRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async create(userId: any, dto: CreateBookmarkDto) {
    return this.bookmarkRepo.create({
      user_id: userId,
      chapter_id: dto.chapter_id,
      page_number: dto.page_number,
    });
  }

  async delete(userId: any, id: any) {
    const bookmark = await this.bookmarkRepo.findById(id);
    if (!bookmark) throw new NotFoundException('Bookmark not found');
    if (bookmark.user_id !== toPrimaryKey(userId)) throw new ForbiddenException('Not your bookmark');
    await this.bookmarkRepo.delete(id);
    return { success: true };
  }
}
