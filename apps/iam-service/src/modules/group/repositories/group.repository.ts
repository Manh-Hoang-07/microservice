import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: any, skip: number, take: number) {
    return this.prisma.group.findMany({
      where,
      skip,
      take,
      orderBy: { created_at: 'desc' },
      include: { context: { select: { id: true, code: true, name: true } } },
    });
  }

  count(where: any) {
    return this.prisma.group.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.group.findUnique({
      where: { id },
      include: { context: { select: { id: true, code: true, name: true } } },
    });
  }

  findByCode(code: string) {
    return this.prisma.group.findFirst({ where: { code } });
  }

  create(data: any) {
    return this.prisma.group.create({ data });
  }

  update(id: PrimaryKey, data: any) {
    return this.prisma.group.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.group.delete({ where: { id } });
  }

  getMembers(groupId: PrimaryKey, skip: number, take: number) {
    return this.prisma.userGroup.findMany({
      where: { group_id: groupId },
      orderBy: { joined_at: 'desc' },
      skip,
      take,
    });
  }

  countMembers(groupId: PrimaryKey) {
    return this.prisma.userGroup.count({ where: { group_id: groupId } });
  }

  addMember(groupId: PrimaryKey, userId: PrimaryKey) {
    return this.prisma.userGroup.upsert({
      where: { user_id_group_id: { user_id: userId, group_id: groupId } },
      create: { user_id: userId, group_id: groupId },
      update: {},
    });
  }

  removeMember(groupId: PrimaryKey, userId: PrimaryKey) {
    return this.prisma.userGroup.delete({
      where: { user_id_group_id: { user_id: userId, group_id: groupId } },
    });
  }
}
