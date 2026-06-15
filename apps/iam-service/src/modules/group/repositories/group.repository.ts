import { Injectable, Logger, Optional } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { createPaginationMeta } from '@package/common';
import { RedisService } from '@package/redis';
import { PrismaService } from '../../../core/database/prisma.service';
import { toPrimaryKey } from 'src/types';

type Tx = Prisma.TransactionClient | PrismaService;

// Gioi han so member keo ve 1 lan — chong DoS khi nhom qua lon.
const MEMBER_FETCH_CAP = 500;
// Cache danh sach member ids — invalidate khi them/bot thanh vien.
const MEMBER_IDS_TTL = 60;
const memberIdsKey = (groupId: string | bigint) => `iam:group:${groupId}:member_ids`;

const USER_GROUP_SELECT = {
  id: true,
  code: true,
  name: true,
  type: true,
  status: true,
  description: true,
  ownerId: true,
  metadata: true,
} satisfies Prisma.GroupSelect;

export interface GroupFilter {
  search?: string;
  type?: string;
  status?: string;
  ownerId?: any;
}

const LIST_SELECT = {
  id: true,
  code: true,
  name: true,
  description: true,
  status: true,
  ownerId: true,
  createdAt: true,
} satisfies Prisma.GroupSelect;

@Injectable()
export class GroupRepository {
  private readonly logger = new Logger(GroupRepository.name);

  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async withTransaction<T>(fn: (tx: Tx) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(fn);
  }

  private buildWhere(filter: GroupFilter): Prisma.GroupWhereInput {
    const where: Prisma.GroupWhereInput = {};
    const andConditions: Prisma.GroupWhereInput[] = [];

    if (filter.search) {
      andConditions.push({
        OR: [
          { code: { contains: filter.search, mode: 'insensitive' } },
          { name: { contains: filter.search, mode: 'insensitive' } },
        ],
      });
    }

    if (filter.type) {
      andConditions.push({ type: filter.type });
    }

    if (filter.status) {
      andConditions.push({ status: filter.status });
    }

    if (filter.ownerId) {
      andConditions.push({ ownerId: toPrimaryKey(filter.ownerId) });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    return where;
  }

  findMany(filter: GroupFilter, options: { skip: number; take: number; orderBy?: any }) {
    return this.prisma.group.findMany({
      where: this.buildWhere(filter),
      select: LIST_SELECT,
      skip: options.skip,
      take: options.take,
      orderBy: options.orderBy ?? { createdAt: 'desc' },
    });
  }

  count(filter: GroupFilter) {
    return this.prisma.group.count({ where: this.buildWhere(filter) });
  }

  private static readonly ALLOWED_SORT_FIELDS = new Set(['id', 'code', 'name', 'status', 'createdAt']);

  async findAll(query: Record<string, any> = {}): Promise<{ data: any[]; meta: any }> {
    const page = Math.max(Number(query.page) || 1, 1);
    const take = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
    const skip = (page - 1) * take;

    const [rawField, rawDir] = String(query.sort || 'createdAt:desc').split(':');
    const sortField = GroupRepository.ALLOWED_SORT_FIELDS.has(rawField) ? rawField : 'createdAt';
    const orderBy = { [sortField]: rawDir?.toLowerCase() === 'asc' ? 'asc' : 'desc' };

    const filter: GroupFilter = {};
    if (query.search) filter.search = String(query.search).slice(0, 100);
    if (query.type) filter.type = query.type;
    if (query.status) filter.status = query.status;
    if (query.ownerId) filter.ownerId = query.ownerId;

    const skipCount = query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.findMany(filter, { skip, take, orderBy }),
      skipCount ? Promise.resolve(0) : this.count(filter),
    ]);

    return { data, meta: createPaginationMeta({ page, skip, take }, total) };
  }

  findById(id: string | bigint) {
    return this.prisma.group.findUnique({
      where: { id: toPrimaryKey(id) },
    });
  }

  findByCode(code: string) {
    return this.prisma.group.findFirst({ where: { code } });
  }

  create(data: any, tx: Tx = this.prisma) {
    return tx.group.create({ data });
  }

  update(id: string | bigint, data: any, tx: Tx = this.prisma) {
    return tx.group.update({ where: { id: toPrimaryKey(id) }, data });
  }

  delete(id: string | bigint, tx: Tx = this.prisma) {
    return tx.group.delete({ where: { id: toPrimaryKey(id) } });
  }

  async isMember(groupId: string | bigint, userId: string | bigint): Promise<boolean> {
    const count = await this.prisma.userGroup.count({
      where: { groupId: toPrimaryKey(groupId), userId: toPrimaryKey(userId) },
    });
    return count > 0;
  }

  getMembers(groupId: string | bigint, skip: number, take: number) {
    return this.prisma.userGroup.findMany({
      where: { groupId: toPrimaryKey(groupId) },
      orderBy: { joinedAt: 'desc' },
      skip,
      take,
    });
  }

  countMembers(groupId: string | bigint) {
    return this.prisma.userGroup.count({ where: { groupId: toPrimaryKey(groupId) } });
  }

  /**
   * Returns list of userIds belonging to the group (capped at MEMBER_FETCH_CAP).
   * Cached in Redis (TTL 60s), invalidated on add/remove member.
   * Used by member listing + internal API for auth-service group scope filtering.
   */
  async findMemberIds(groupId: bigint): Promise<bigint[]> {
    const key = memberIdsKey(groupId);
    const cached = await this.redis?.get(key);
    if (cached) {
      try {
        return (JSON.parse(cached) as string[]).map(BigInt);
      } catch {
        // cache hong — bo qua, doc lai tu DB
      }
    }

    const records = await this.prisma.userGroup.findMany({
      where: { groupId: toPrimaryKey(groupId) },
      select: { userId: true },
      take: MEMBER_FETCH_CAP,
    });
    if (records.length === MEMBER_FETCH_CAP) {
      this.logger.warn(`Group ${groupId} member list capped at ${MEMBER_FETCH_CAP}`);
    }

    const ids = records.map((r) => r.userId);
    await this.redis?.set(key, JSON.stringify(ids.map(String)), MEMBER_IDS_TTL);
    return ids;
  }

  async addMember(groupId: string | bigint, userId: string | bigint, tx: Tx = this.prisma) {
    const gid = toPrimaryKey(groupId);
    const uid = toPrimaryKey(userId);
    const result = await tx.userGroup.upsert({
      where: { userId_groupId: { userId: uid, groupId: gid } },
      create: { userId: uid, groupId: gid },
      update: {},
    });
    await this.redis?.del(memberIdsKey(groupId));
    return result;
  }

  findUserGroups(userId: string | bigint) {
    const uid = toPrimaryKey(userId);
    return this.prisma.userGroup.findMany({
      where: { userId: uid },
      include: { group: { select: USER_GROUP_SELECT } },
      orderBy: { joinedAt: 'asc' },
    });
  }

  /** Paged variant for the "my groups" list — DB-level pagination + optional name search. */
  findUserGroupsPaged(
    userId: string | bigint,
    options: { skip: number; take: number; search?: string },
  ) {
    return this.prisma.userGroup.findMany({
      where: this.buildUserGroupWhere(userId, options.search),
      include: { group: { select: USER_GROUP_SELECT } },
      orderBy: { joinedAt: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  countUserGroups(userId: string | bigint, search?: string) {
    return this.prisma.userGroup.count({
      where: this.buildUserGroupWhere(userId, search),
    });
  }

  private buildUserGroupWhere(userId: string | bigint, search?: string): Prisma.UserGroupWhereInput {
    const where: Prisma.UserGroupWhereInput = { userId: toPrimaryKey(userId) };
    if (search) {
      where.group = { name: { contains: search.slice(0, 100), mode: 'insensitive' } };
    }
    return where;
  }

  async removeMember(groupId: string | bigint, userId: string | bigint, tx: Tx = this.prisma) {
    const gid = toPrimaryKey(groupId);
    const uid = toPrimaryKey(userId);
    const result = await tx.userGroup.deleteMany({
      where: { userId: uid, groupId: gid },
    });
    await this.redis?.del(memberIdsKey(groupId));
    return result;
  }
}
