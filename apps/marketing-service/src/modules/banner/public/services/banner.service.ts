import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta, toPrimaryKey } from '@package/common';

@Injectable()
export class PublicBannerService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 20, 1);
    const skip = (page - 1) * limit;

    const now = new Date();
    const where: any = {
      status: 'active',
      OR: [
        { start_date: null },
        { start_date: { lte: now } },
      ],
      AND: [
        {
          OR: [
            { end_date: null },
            { end_date: { gte: now } },
          ],
        },
      ],
    };

    if (query.location_id) {
      where.location_id = toPrimaryKey(query.location_id);
    }

    if (query.location_code) {
      where.location = { code: query.location_code };
    }

    const [data, total] = await Promise.all([
      this.prisma.banner.findMany({
        where,
        include: { location: { select: { id: true, code: true, name: true } } },
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.banner.count({ where }),
    ]);

    return {
      data,
      meta: createPaginationMeta(page, limit, total),
    };
  }
}
