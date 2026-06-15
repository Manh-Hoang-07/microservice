import { Injectable } from '@nestjs/common';
import { ListService, getSessionUserId, parseQueryOptions, createPaginationMeta } from '@package/common';
import { GroupRepository } from '../../repositories/group.repository';

@Injectable()
export class UserGroupService extends ListService<GroupRepository> {
  constructor(groupRepo: GroupRepository) {
    super(groupRepo);
  }

  async getList(query: Record<string, any> = {}): Promise<any> {
    const userId = getSessionUserId();
    if (!userId) return { data: [], meta: { total: 0, page: 1, limit: 0 } };

    const options = parseQueryOptions(query);
    const search = (query.search as string | undefined)?.trim() || undefined;

    const [rows, total] = await Promise.all([
      this.repository.findUserGroupsPaged(userId, {
        skip: options.skip,
        take: options.take,
        search,
      }),
      this.repository.countUserGroups(userId, search),
    ]);

    const data = rows.map((r) => ({ ...r.group, joinedAt: r.joinedAt }));
    return { data, meta: createPaginationMeta(options, total) };
  }
}
