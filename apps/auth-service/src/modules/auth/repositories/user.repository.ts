import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByEmailWithProfile(email: string) {
    return this.prisma.user.findUnique({ where: { email }, include: { profile: true } });
  }

  findById(id: PrimaryKey) {
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

  create(data: Record<string, any>) {
    return this.prisma.user.create({ data: data as Prisma.UserCreateInput });
  }

  update(id: PrimaryKey, data: Record<string, any>) {
    return this.prisma.user.update({ where: { id }, data: data as Prisma.UserUpdateInput });
  }

  updateLastLogin(id: PrimaryKey) {
    return this.prisma.user
      .update({ where: { id }, data: { last_login_at: new Date() } })
      .catch(() => undefined);
  }
}
