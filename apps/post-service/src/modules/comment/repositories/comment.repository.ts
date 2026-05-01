import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface CommentFilter {
  post_id?: any;
  parent_id?: any;
  status?: string;
  user_id?: any;
}

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: CommentFilter): Prisma.CommentWhereInput {
    const where: Prisma.CommentWhereInput = {};
    if (filter.post_id !== undefined) where.post_id = toPrimaryKey(filter.post_id);
    if (filter.user_id !== undefined) where.user_id = toPrimaryKey(filter.user_id);
    if (filter.status) where.status = filter.status;
    if (filter.parent_id !== undefined) {
      where.parent_id = filter.parent_id === null ? null : toPrimaryKey(filter.parent_id);
    }
    return where;
  }

  findMany(filter: CommentFilter, options: { skip: number; take: number }) {
    return this.prisma.comment.findMany({
      where: this.buildWhere(filter),
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyWithReplies(filter: CommentFilter, options: { skip: number; take: number }) {
    return this.prisma.comment.findMany({
      where: this.buildWhere(filter),
      include: {
        replies: {
          where: { status: 'visible' },
          orderBy: { created_at: 'asc' },
        },
      },
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: CommentFilter) {
    return this.prisma.comment.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.comment.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  create(data: Record<string, any>) {
    return this.prisma.comment.create({
      data: this.normalizePayload(data) as Prisma.CommentUncheckedCreateInput,
    });
  }

  createOutbox(event_type: string, payload: Record<string, any>) {
    return this.prisma.outbox.create({ data: { event_type, payload } });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.comment.update({
      where: { id: toPrimaryKey(id) },
      data: this.normalizePayload(data) as Prisma.CommentUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.comment.delete({ where: { id: toPrimaryKey(id) } });
  }

  private normalizePayload(data: Record<string, any>): Record<string, any> {
    const payload = { ...data };
    const bigIntFields = ['post_id', 'parent_id', 'user_id', 'created_user_id', 'updated_user_id'];
    for (const field of bigIntFields) {
      const value = payload[field];
      if (value === undefined) continue;
      payload[field] = value === null || value === '' ? null : toPrimaryKey(value);
    }
    return payload;
  }
}
