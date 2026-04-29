import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';

@Injectable()
export class PublicChapterService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: bigint) {
    const chapter = await this.prisma.chapter.findFirst({
      where: { id, status: 'published' },
      include: {
        pages: { orderBy: { page_number: 'asc' } },
        comic: { select: { id: true, title: true, slug: true } },
      },
    });
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async getPages(id: bigint) {
    const chapter = await this.prisma.chapter.findFirst({
      where: { id, status: 'published' },
    });
    if (!chapter) throw new NotFoundException('Chapter not found');

    const pages = await this.prisma.chapterPage.findMany({
      where: { chapter_id: id },
      orderBy: { page_number: 'asc' },
    });

    return { data: pages };
  }

  async getNext(id: bigint) {
    const current = await this.prisma.chapter.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Chapter not found');

    const next = await this.prisma.chapter.findFirst({
      where: {
        comic_id: current.comic_id,
        chapter_index: { gt: current.chapter_index },
        status: 'published',
      },
      orderBy: { chapter_index: 'asc' },
      select: { id: true, title: true, chapter_index: true, chapter_label: true },
    });

    return next || null;
  }

  async getPrev(id: bigint) {
    const current = await this.prisma.chapter.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Chapter not found');

    const prev = await this.prisma.chapter.findFirst({
      where: {
        comic_id: current.comic_id,
        chapter_index: { lt: current.chapter_index },
        status: 'published',
      },
      orderBy: { chapter_index: 'desc' },
      select: { id: true, title: true, chapter_index: true, chapter_label: true },
    });

    return prev || null;
  }
}
