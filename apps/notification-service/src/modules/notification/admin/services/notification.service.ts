import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { NotificationRepository } from '../../repositories/notification.repository';
import { SendNotificationDto } from '../dtos/send-notification.dto';

const NUMERIC_RE = /^\d{1,20}$/;
const ALLOWED_TYPES = new Set(['info', 'success', 'warning', 'error']);
const ALLOWED_STATUSES = new Set(['active', 'archived', 'deleted']);

@Injectable()
export class AdminNotificationService {
  constructor(
    private readonly notifRepo: NotificationRepository,
    private readonly i18n: I18nService,
  ) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const filter: any = {};
    // Validate at the service boundary: surface bad values as 400 instead
    // of a 500 from `BigInt('abc')` deep in the repo.
    if (query.user_id) {
      if (!NUMERIC_RE.test(String(query.user_id))) {
        throw new BadRequestException('user_id must be numeric');
      }
      filter.user_id = String(query.user_id);
    }
    if (query.type) {
      if (!ALLOWED_TYPES.has(String(query.type))) {
        throw new BadRequestException('Invalid notification type');
      }
      filter.type = query.type;
    }
    if (query.status) {
      if (!ALLOWED_STATUSES.has(String(query.status))) {
        throw new BadRequestException('Invalid notification status');
      }
      filter.status = query.status;
    }
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
