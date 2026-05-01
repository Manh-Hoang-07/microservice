import { Injectable, NotFoundException } from '@nestjs/common';
import { ChapterRepository } from '../../repositories/chapter.repository';

@Injectable()
export class PublicChapterService {
  constructor(private readonly chapterRepo: ChapterRepository) {}

  async getOne(id: any) {
    const chapter = await this.chapterRepo.findPublicOne(id);
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async getPages(id: any) {
    const chapter = await this.chapterRepo.findPublicOne(id);
    if (!chapter) throw new NotFoundException('Chapter not found');

    const pages = await this.chapterRepo.findPages(id);
    return { data: pages };
  }

  async getNext(id: any) {
    const current = await this.chapterRepo.findById(id);
    if (!current) throw new NotFoundException('Chapter not found');
    return (await this.chapterRepo.findPublishedNeighbor(current.comic_id, current.chapter_index, 'next')) || null;
  }

  async getPrev(id: any) {
    const current = await this.chapterRepo.findById(id);
    if (!current) throw new NotFoundException('Chapter not found');
    return (await this.chapterRepo.findPublishedNeighbor(current.comic_id, current.chapter_index, 'prev')) || null;
  }
}
