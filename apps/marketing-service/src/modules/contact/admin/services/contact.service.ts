import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class AdminContactService {
  constructor(private readonly prisma: PrismaService) {}

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
      this.prisma.contact.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.contact.count({ where }),
    ]);

    return {
      data,
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async getOne(id: bigint) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async reply(id: bigint, replyText: string, userId: bigint) {
    await this.getOne(id);

    return this.prisma.contact.update({
      where: { id },
      data: {
        reply: replyText,
        status: 'Replied',
        replied_at: new Date(),
        replied_by: userId,
      },
    });
  }

  async markAsRead(id: bigint) {
    await this.getOne(id);

    return this.prisma.contact.update({
      where: { id },
      data: { status: 'Read' },
    });
  }

  async closeContact(id: bigint) {
    await this.getOne(id);

    return this.prisma.contact.update({
      where: { id },
      data: { status: 'Closed' },
    });
  }
}
