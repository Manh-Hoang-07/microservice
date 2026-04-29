import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.NotificationWhereInput, options: { skip: number; take: number }) {
    return this.prisma.notification.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.NotificationWhereInput) {
    return this.prisma.notification.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.NotificationWhereInput) {
    return this.prisma.notification.findFirst({ where });
  }

  create(data: {
    user_id: bigint;
    title: string;
    message: string;
    type?: string;
    data?: any;
    status?: string;
  }) {
    return this.prisma.notification.create({ data });
  }

  createMany(data: Array<{ user_id: bigint; title: string; message: string; type?: string; data?: any }>) {
    return this.prisma.notification.createMany({ data });
  }

  update(id: bigint, data: Prisma.NotificationUpdateInput) {
    return this.prisma.notification.update({ where: { id }, data });
  }

  updateMany(where: Prisma.NotificationWhereInput, data: Prisma.NotificationUpdateInput) {
    return this.prisma.notification.updateMany({ where, data });
  }

  delete(id: bigint) {
    return this.prisma.notification.delete({ where: { id } });
  }
}
