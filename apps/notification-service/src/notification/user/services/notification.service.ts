import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { NotificationRepository } from '../../repositories/notification.repository';

@Injectable()
export class UserNotificationService {
  constructor(private readonly notifRepo: NotificationRepository) {}

  async getList(userId: bigint, query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { user_id: userId, status: 'active' };
    if (query.type) where.type = query.type;
    if (query.is_read !== undefined) where.is_read = query.is_read === 'true';

    const [data, total] = await Promise.all([
      this.notifRepo.findMany(where, { skip, take: limit }),
      this.notifRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getUnreadCount(userId: bigint) {
    const count = await this.notifRepo.count({ user_id: userId, is_read: false, status: 'active' });
    return { count };
  }

  async getOne(userId: bigint, id: bigint) {
    const notif = await this.notifRepo.findFirst({ id, user_id: userId });
    if (!notif) throw new NotFoundException('Notification not found');
    return notif;
  }

  async markAsRead(userId: bigint, id: bigint) {
    const notif = await this.getOne(userId, id);
    return this.notifRepo.update(notif.id, { is_read: true, read_at: new Date() });
  }

  async markAllAsRead(userId: bigint) {
    const result = await this.notifRepo.updateMany(
      { user_id: userId, is_read: false },
      { is_read: true, read_at: new Date() },
    );
    return { updated: result.count };
  }
}
