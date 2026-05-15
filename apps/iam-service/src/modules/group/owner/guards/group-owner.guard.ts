import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { t, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { GroupRepository } from '../../repositories/group.repository';

@Injectable()
export class GroupOwnerGuard implements CanActivate {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params?.id;
    if (!id) return false;

    const group = await this.groupRepo.findById(toPrimaryKey(id));
    if (!group) throw new NotFoundException(t(this.i18n, 'group.NOT_FOUND'));

    const sess = session();
    if (!sess?.userId) return false;

    if (group.ownerId !== toPrimaryKey(sess.userId)) {
      throw new ForbiddenException(t(this.i18n, 'group.NOT_OWNER'));
    }

    request.group = group;
    return true;
  }
}
