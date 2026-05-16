import { Injectable } from '@nestjs/common';
import { ListService, session } from '@package/common';
import { GroupRepository } from '../../repositories/group.repository';
import { toPrimaryKey } from 'src/types';

@Injectable()
export class UserGroupService extends ListService<GroupRepository> {
  constructor(groupRepo: GroupRepository) {
    super(groupRepo);
  }

  async getList(_query: Record<string, any> = {}): Promise<any> {
    const sess = session();
    if (!sess?.userId) return { data: [], meta: { total: 0, page: 1, limit: 0 } };
    const rows = await this.repository.findUserGroups(toPrimaryKey(sess.userId));
    const data = rows.map((r) => ({ ...r.group, joinedAt: r.joinedAt }));
    return { data, meta: { total: data.length, page: 1, limit: data.length } };
  }
}
