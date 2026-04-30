import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PostCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.PostCommentWhereInput, options: { skip: number; take: number }) {
    return this.prisma.postComment.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(where: Prisma.PostCommentWhereInput, options: { skip: number; take: number }) {
    return this.prisma.postComment.findMany({
      where,
      include: { replies: { where: { status: 'visible' }, orderBy: { created_at: 'asc' } } },
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.PostCommentWhereInput) {
    return this.prisma.postComment.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.postComment.findUnique({ where: { id } });
  }

  create(data: {
    user_id?: PrimaryKey | null;
    post_id: PrimaryKey;
    parent_id?: PrimaryKey | null;
    guest_name?: string | null;
    guest_email?: string | null;
    content: string;
  }) {
    return this.prisma.postComment.create({ data });
  }

  createOutbox(data: Prisma.PostOutboxCreateInput) {
    return this.prisma.postOutbox.create({ data });
  }

  update(id: PrimaryKey, data: Prisma.PostCommentUpdateInput) {
    return this.prisma.postComment.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.postComment.delete({ where: { id } });
  }
}
