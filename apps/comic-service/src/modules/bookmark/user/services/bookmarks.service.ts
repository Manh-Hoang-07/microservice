import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { BookmarkRepository } from '../../repositories/bookmark.repository';

@Injectable()
export class UserBookmarkService {
  constructor(private readonly bookmarkRepo: BookmarkRepository) {}

  async getList(userId: PrimaryKey, query: any) {
    const options = parseQueryOptions(query);

    const where = { user_id: userId };

    const [data, total] = await Promise.all([
      this.bookmarkRepo.findMany(where, options),
      this.bookmarkRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async create(userId: PrimaryKey, dto: CreateBookmarkDto) {
    return this.bookmarkRepo.create({
      user_id: userId,
      chapter_id: BigInt(dto.chapter_id),
      page_number: dto.page_number,
    });
  }

  async delete(userId: PrimaryKey, id: PrimaryKey) {
    const bookmark = await this.bookmarkRepo.findById(id);
    if (!bookmark) throw new NotFoundException('Bookmark not found');
    if (bookmark.user_id !== userId) throw new ForbiddenException('Not your bookmark');
    await this.bookmarkRepo.delete(id);
    return { success: true };
  }
}
