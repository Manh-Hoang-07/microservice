import { Injectable } from '@nestjs/common';
import { ListService, session } from '@package/common';
import { GroupRepository } from '../../repositories/group.repository';
import { toPrimaryKey } from 'src/types';

@Injectable()
export class UserGroupService extends ListService<GroupRepository> {
  constructor(groupRepo: GroupRepository) {
    super(groupRepo);
  }

  async getList(_query: Record<string, any> = {}) {
    const sess = session();
    if (!sess?.userId) return { data: [] };
    const rows = await this.repository.findUserGroups(toPrimaryKey(sess.userId));
    return { data: rows.map((r) => ({ ...r.group, joinedAt: r.joinedAt })) };
  }
}
