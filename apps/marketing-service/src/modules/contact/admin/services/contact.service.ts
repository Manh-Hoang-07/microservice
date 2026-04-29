import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { ContactRepository } from '../../repositories/contact.repository';

@Injectable()
export class AdminContactService {
  constructor(private readonly contactRepo: ContactRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { email: { contains: query.search } },
        { phone: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.contactRepo.findMany(where, { skip, take: limit }),
      this.contactRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const contact = await this.contactRepo.findById(id);
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async reply(id: bigint, replyText: string, userId: bigint) {
    await this.getOne(id);
    return this.contactRepo.update(id, {
      reply: replyText,
      status: 'Replied',
      replied_at: new Date(),
      replied_by: userId,
    });
  }

  async markAsRead(id: bigint) {
    await this.getOne(id);
    return this.contactRepo.update(id, { status: 'Read' });
  }

  async closeContact(id: bigint) {
    await this.getOne(id);
    return this.contactRepo.update(id, { status: 'Closed' });
  }
}
