import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  findById(id: bigint) {
    return this.prisma.postComment.findUnique({ where: { id } });
  }

  create(data: {
    user_id?: bigint | null;
    post_id: bigint;
    parent_id?: bigint | null;
    guest_name?: string | null;
    guest_email?: string | null;
    content: string;
  }) {
    return this.prisma.postComment.create({ data });
  }

  createOutbox(data: Prisma.PostOutboxCreateInput) {
    return this.prisma.postOutbox.create({ data });
  }

  update(id: bigint, data: Prisma.PostCommentUpdateInput) {
    return this.prisma.postComment.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.postComment.delete({ where: { id } });
  }
}
