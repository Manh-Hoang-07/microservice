import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { createPaginationMeta } from '../../../common/pagination.helper';

@Injectable()
export class UserNotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(userId: bigint, query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { user_id: userId, status: 'active' };
    if (query.type) where.type = query.type;
    if (query.is_read !== undefined) where.is_read = query.is_read === 'true';

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({ where, orderBy: { created_at: 'desc' }, skip, take: limit }),
      this.prisma.notification.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getUnreadCount(userId: bigint) {
    const count = await this.prisma.notification.count({
      where: { user_id: userId, is_read: false, status: 'active' },
    });
    return { count };
  }

  async getOne(userId: bigint, id: bigint) {
    const notif = await this.prisma.notification.findFirst({
      where: { id, user_id: userId },
    });
    if (!notif) throw new NotFoundException('Notification not found');
    return notif;
  }

  async markAsRead(userId: bigint, id: bigint) {
    const notif = await this.getOne(userId, id);
    return this.prisma.notification.update({
      where: { id: notif.id },
      data: { is_read: true, read_at: new Date() },
    });
  }

  async markAllAsRead(userId: bigint) {
    const result = await this.prisma.notification.updateMany({
      where: { user_id: userId, is_read: false },
      data: { is_read: true, read_at: new Date() },
    });
    return { updated: result.count };
  }
}
