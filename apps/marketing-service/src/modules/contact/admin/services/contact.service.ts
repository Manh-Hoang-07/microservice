import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ContactRepository } from '../../repositories/contact.repository';

@Injectable()
export class AdminContactService {
  constructor(private readonly contactRepo: ContactRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.contactRepo.findMany(where, options),
      this.contactRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const contact = await this.contactRepo.findById(id);
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async reply(id: PrimaryKey, replyText: string, userId: PrimaryKey) {
    await this.getOne(id);
    return this.contactRepo.update(id, {
      reply: replyText,
      status: 'Replied',
      replied_at: new Date(),
      replied_by: userId,
    });
  }

  async markAsRead(id: PrimaryKey) {
    await this.getOne(id);
    return this.contactRepo.update(id, { status: 'Read' });
  }

  async closeContact(id: PrimaryKey) {
    await this.getOne(id);
    return this.contactRepo.update(id, { status: 'Closed' });
  }
}
