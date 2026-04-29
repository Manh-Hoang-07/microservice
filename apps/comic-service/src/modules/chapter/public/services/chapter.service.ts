import { Injectable, NotFoundException } from '@nestjs/common';
import { ChapterRepository } from '../../repositories/chapter.repository';

@Injectable()
export class PublicChapterService {
  constructor(private readonly chapterRepo: ChapterRepository) {}

  async getOne(id: bigint) {
    const chapter = await this.chapterRepo.findPublicOne(id);
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async getPages(id: bigint) {
    const chapter = await this.chapterRepo.findFirst({ id, status: 'published' });
    if (!chapter) throw new NotFoundException('Chapter not found');

    const pages = await this.chapterRepo.findPages(id);
    return { data: pages };
  }

  async getNext(id: bigint) {
    const current = await this.chapterRepo.findById(id);
    if (!current) throw new NotFoundException('Chapter not found');

    const next = await this.chapterRepo.findNextChapter(current.comic_id, current.chapter_index);
    return next || null;
  }

  async getPrev(id: bigint) {
    const current = await this.chapterRepo.findById(id);
    if (!current) throw new NotFoundException('Chapter not found');

    const prev = await this.chapterRepo.findPrevChapter(current.comic_id, current.chapter_index);
    return prev || null;
  }
}
