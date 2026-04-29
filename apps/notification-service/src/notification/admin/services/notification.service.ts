import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { NotificationRepository } from '../../repositories/notification.repository';

@Injectable()
export class AdminNotificationService {
  constructor(private readonly notifRepo: NotificationRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.user_id) where.user_id = BigInt(query.user_id);
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;
    if (query.is_read !== undefined) where.is_read = query.is_read === 'true';

    const [data, total] = await Promise.all([
      this.notifRepo.findMany(where, { skip, take: limit }),
      this.notifRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const notif = await this.notifRepo.findById(id);
    if (!notif) throw new NotFoundException('Notification not found');
    return notif;
  }

  async create(data: any) {
    return this.notifRepo.create({
      user_id: BigInt(data.user_id),
      title: data.title,
      message: data.message,
      type: data.type || 'info',
      data: data.data,
      status: data.status || 'active',
    });
  }

  async createMany(notifications: Array<{ user_id: bigint; title: string; message: string; type?: string; data?: any }>) {
    return this.notifRepo.createMany(notifications.map((n) => ({
      user_id: n.user_id,
      title: n.title,
      message: n.message,
      type: n.type || 'info',
      data: n.data,
    })));
  }

  async update(id: bigint, data: any) {
    await this.getOne(id);
    return this.notifRepo.update(id, data);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.notifRepo.delete(id);
    return { success: true };
  }
}
