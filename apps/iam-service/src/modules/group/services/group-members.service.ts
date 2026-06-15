import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions, type QueryOptions } from '@package/common';
import { GroupRepository } from '../repositories/group.repository';
import { GroupMemberRoleRepository } from '../repositories/group-member-role.repository';
import { AuthClient, type UserInfo } from '../../../clients/auth.client';

const ALLOWED_SORT = new Set(['name', 'email', 'username', 'status']);

/**
 * Logic liet ke thanh vien nhom — DUNG CHUNG cho admin (GroupService) va
 * group-owner (GroupOwnerService) de tranh 2 ban copy. Khong phai lop audience;
 * la shared service cap module (giong repositories/).
 *
 * Toi uu over-fetch:
 *   - KHONG search: paginate danh sach userId TRUOC khi goi auth (chi keo dung
 *     trang) va `total` lay tu DB count that → khong over-fetch, total dung khi
 *     nhom > MEMBER_FETCH_CAP.
 *   - CO search: authClient.getUsersByIds KHONG ho tro search/paginate phia
 *     auth-service → giu hanh vi cu (keo danh sach member da cap, filter+sort+
 *     slice trong JS). GIOI HAN: voi nhom rat lon (> cap) ket qua search chi
 *     phu pham vi cap — danh doi co y, khong lam sai ket qua trong pham vi do.
 */
@Injectable()
export class GroupMembersService {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly memberRoleRepo: GroupMemberRoleRepository,
    private readonly authClient: AuthClient,
  ) {}

  async listMembers(
    groupId: string | bigint,
    query: { roleId?: string; search?: string; sort?: string; page?: any; limit?: any },
  ): Promise<{ data: UserInfo[]; meta: ReturnType<typeof createPaginationMeta> }> {
    const options = parseQueryOptions(query);
    const gid = BigInt(String(groupId));
    const search = query.search?.toLowerCase().trim();

    // ─── Tap userId ung vien (giao member ∩ role neu loc role) ─────────────────
    let candidateIds = await this.groupRepo.findMemberIds(gid);
    if (!candidateIds.length) {
      return { data: [], meta: createPaginationMeta(options, 0) };
    }

    if (query.roleId) {
      const roleUserIds = await this.memberRoleRepo.findUserIdsByRole(groupId, query.roleId);
      const roleSet = new Set(roleUserIds.map(String));
      candidateIds = candidateIds.filter((id) => roleSet.has(String(id)));
      if (!candidateIds.length) {
        return { data: [], meta: createPaginationMeta(options, 0) };
      }
    }

    // ─── CO search: giu hanh vi cu (filter/sort/slice trong JS) ────────────────
    if (search) {
      return this.searchPath(candidateIds, options, search, query.sort);
    }

    // ─── KHONG search: paginate userId TRUOC, total tu count that ──────────────
    return this.pagedPath(gid, candidateIds, options, query.roleId);
  }

  /** No-search: slice userId list theo trang roi chi goi auth cho dung trang. */
  private async pagedPath(
    gid: bigint,
    candidateIds: bigint[],
    options: QueryOptions,
    roleId?: string,
  ) {
    // total that: roleId → so ung vien sau giao; nguoc lai → DB count member.
    const total = roleId ? candidateIds.length : await this.groupRepo.countMembers(gid);

    const pageIds = candidateIds.slice(options.skip, options.skip + options.take).map(String);
    if (!pageIds.length) {
      return { data: [], meta: createPaginationMeta(options, total) };
    }
    const users = await this.authClient.getUsersByIds(pageIds);
    return { data: users, meta: createPaginationMeta(options, total) };
  }

  /** Search: keo user theo danh sach ung vien, filter+sort+slice trong JS. */
  private async searchPath(
    candidateIds: bigint[],
    options: QueryOptions,
    search: string,
    sort?: string,
  ) {
    const users = await this.authClient.getUsersByIds(candidateIds.map(String));
    const filtered = users.filter(
      (u) =>
        u.name?.toLowerCase().includes(search) ||
        u.email?.toLowerCase().includes(search) ||
        u.username?.toLowerCase().includes(search),
    );

    const [sortField, sortDir] = (sort ?? 'name:asc').split(':');
    const dir = sortDir?.toLowerCase() === 'desc' ? -1 : 1;
    if (ALLOWED_SORT.has(sortField)) {
      filtered.sort((a, b) => {
        const av = (a as any)[sortField] ?? '';
        const bv = (b as any)[sortField] ?? '';
        return av.localeCompare(bv) * dir;
      });
    }

    const total = filtered.length;
    const paged = filtered.slice(options.skip, options.skip + options.take);
    return { data: paged, meta: createPaginationMeta(options, total) };
  }
}
