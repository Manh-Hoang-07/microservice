import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class ComicCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ComicCommentWhereInput, options: { skip: number; take: number }) {
    return this.prisma.comicComment.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(where: Prisma.ComicCommentWhereInput, options: { skip: number; take: number }) {
    return this.prisma.comicComment.findMany({
      where,
      include: {
        replies: { where: { status: 'visible' }, orderBy: { created_at: 'asc' } },
      },
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.ComicCommentWhereInput) {
    return this.prisma.comicComment.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.comicComment.findUnique({ where: { id } });
  }

  create(data: {
    user_id: PrimaryKey;
    comic_id: PrimaryKey;
    chapter_id?: PrimaryKey | null;
    parent_id?: PrimaryKey | null;
    content: string;
  }) {
    return this.prisma.comicComment.create({ data });
  }

  createOutbox(data: Prisma.ComicOutboxCreateInput) {
    return this.prisma.comicOutbox.create({ data });
  }

  update(id: PrimaryKey, data: Prisma.ComicCommentUpdateInput) {
    return this.prisma.comicComment.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.comicComment.delete({ where: { id } });
  }
}
