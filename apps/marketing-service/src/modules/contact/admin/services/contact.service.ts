import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { ContactFilter, ContactRepository } from '../../repositories/contact.repository';

@Injectable()
export class AdminContactService {
  constructor(private readonly contactRepo: ContactRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ContactFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.email) filter.email = query.email;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.contactRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.contactRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const contact = await this.contactRepo.findById(id);
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async reply(id: any, replyText: string, userId: any) {
    await this.getOne(id);
    return this.contactRepo.update(id, {
      reply: replyText,
      status: 'Replied',
      replied_at: new Date(),
      replied_by: userId,
    });
  }

  async markAsRead(id: any) {
    await this.getOne(id);
    return this.contactRepo.update(id, { status: 'Read' });
  }

  async closeContact(id: any) {
    await this.getOne(id);
    return this.contactRepo.update(id, { status: 'Closed' });
  }
}
