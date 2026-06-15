import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Internal, InternalGuard } from '@package/common';
import { toPrimaryKey } from 'src/types';

const USER_SELECT = {
  id: true,
  username: true,
  email: true,
  name: true,
  image: true,
  status: true,
} as const;

@Internal()
@UseGuards(InternalGuard)
@Controller('internal/users')
export class InternalUsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getUsersByIds(@Query('ids') ids: string) {
    if (!ids) return [];
    const idList = ids
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
      .map((id) => toPrimaryKey(id));

    if (!idList.length) return [];

    const users = await this.prisma.user.findMany({
      where: { id: { in: idList } },
      select: USER_SELECT,
    });

    return users.map((u) => ({ ...u, id: String(u.id) }));
  }

  /** Tìm user theo email hoặc username (exact match). Dùng để thêm thành viên nhóm. */
  @Get('lookup')
  async lookupUser(
    @Query('email') email?: string,
    @Query('username') username?: string,
  ) {
    if (!email && !username) return null;

    const where = email ? { email } : { username };
    const user = await this.prisma.user.findUnique({
      where,
      select: USER_SELECT,
    });

    if (!user) return null;
    return { ...user, id: String(user.id) };
  }
}
