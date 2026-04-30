import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { NotificationRepository } from '../../repositories/notification.repository';
import { SendNotificationDto } from '../dtos/send-notification.dto';

@Injectable()
export class AdminNotificationService {
  constructor(
    private readonly notifRepo: NotificationRepository,
    private readonly i18n: I18nService,
  ) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const filter: any = {};
    if (query.user_id) filter.user_id = query.user_id;
    if (query.type) filter.type = query.type;
    if (query.status) filter.status = query.status;
    if (query.is_read !== undefined) filter.is_read = query.is_read === 'true';

    const [data, total] = await Promise.all([
      this.notifRepo.findMany(filter, options),
      this.notifRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async send(dto: SendNotificationDto) {
    return this.notifRepo.createMany(
      dto.user_ids.map((user_id) => ({
        user_id,
        title: dto.title,
        message: dto.message,
        type: dto.type,
        data: dto.data,
        status: 'active',
      })),
    );
  }

  async delete(id: PrimaryKey) {
    const lang = I18nContext.current()?.lang;
    const notif = await this.notifRepo.findById(id);
    if (!notif) throw new NotFoundException(this.i18n.t('notification.NOT_FOUND', { lang }));
    await this.notifRepo.delete(id);
    return { success: true };
  }

  // --- internal methods called from Kafka events ---

  async create(data: { user_id: string | bigint; title: string; message: string; type?: string; data?: any }) {
    return this.notifRepo.create({ ...data, status: 'active' });
  }

  async createMany(notifications: Array<{ user_id: string | bigint; title: string; message: string; type?: string; data?: any }>) {
    return this.notifRepo.createMany(notifications.map((n) => ({ ...n, status: 'active' })));
  }
}
