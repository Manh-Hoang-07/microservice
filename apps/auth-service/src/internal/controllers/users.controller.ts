import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';
import { InternalGuard } from '@package/common';

@ApiTags('Internal')
@UseGuards(InternalGuard)
@Controller('internal/users')
export class InternalUsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Get users by IDs (internal)' })
  @ApiQuery({ name: 'ids', description: 'Comma-separated user IDs', required: true })
  async getUsersByIds(@Query('ids') ids: string) {
    if (!ids) return [];
    const idList = ids
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
      .map((id) => BigInt(id));

    if (!idList.length) return [];

    const users = await this.prisma.user.findMany({
      where: { id: { in: idList } },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        image: true,
        status: true,
      },
    });

    return users.map((u) => ({
      ...u,
      id: String(u.id),
    }));
  }
}
