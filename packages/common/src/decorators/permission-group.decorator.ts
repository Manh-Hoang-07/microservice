import { SetMetadata, applyDecorators } from '@nestjs/common';
import { PERMS_KEY } from './permission.decorator';

export const PERM_GROUP_KEY = 'perm_group_required';

export interface PermissionGroupMeta {
  /** Permission code can co de thuc hien thao tac trong nhom, vd 'post.update'. */
  permission: string;
  /** Ten route param chua groupId (mac dinh 'groupId'). */
  param: string;
}

/**
 * Route nhom: yeu cau dang nhap + thuoc nhom + co quyen thao tac trong nhom do.
 *
 * Gop 2 metadata:
 *  - PERMS_KEY=['authenticated'] → JwtGuard van bat dang nhap, RbacGuard bo qua
 *    check quyen toan cuc.
 *  - PERM_GROUP_KEY → GroupPermissionGuard doc groupId tu route param roi hoi
 *    IAM xem user co `permission` trong nhom khong (owner co full quyen loai nhom).
 *
 * Vi du: `@PermissionGroup('post.update')` tren `@Controller('groups/:groupId/posts')`.
 */
export const PermissionGroup = (permission: string, opts?: { param?: string }) =>
  applyDecorators(
    SetMetadata(PERMS_KEY, ['authenticated']),
    SetMetadata(PERM_GROUP_KEY, {
      permission,
      param: opts?.param ?? 'groupId',
    } as PermissionGroupMeta),
  );
