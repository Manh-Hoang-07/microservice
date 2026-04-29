import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByEmailWithProfile(email: string) {
    return this.prisma.user.findUnique({ where: { email }, include: { profile: true } });
  }

  findById(id: bigint) {
    return this.prisma.user.findUnique({ where: { id }, include: { profile: true } });
  }

  findByEmailSelect(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, status: true, password: true },
    });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  findByPhone(phone: string) {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  update(id: bigint, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  updateLastLogin(id: bigint) {
    return this.prisma.user
      .update({ where: { id }, data: { last_login_at: new Date() } })
      .catch(() => undefined);
  }
}
