export const PERM = {
  SYSTEM: {
    MANAGE: 'system.manage',
    CONFIG_VIEW: 'system.config.view',
    CONFIG_UPDATE: 'system.config.update',
    BANNER_MANAGE: 'banner.manage',
  },
  ROLE: {
    MANAGE: 'role.manage',
    VIEW: 'role.view',
    CREATE: 'role.create',
    UPDATE: 'role.update',
    DELETE: 'role.delete',
  },
  PERMISSION: {
    MANAGE: 'permission.manage',
    VIEW: 'permission.view',
    SYNC: 'permission.sync',
  },
  ASSIGNMENT: {
    MANAGE: 'assignment.manage',
    VIEW: 'assignment.view',
  },
  USER: {
    MANAGE: 'user.manage',
    VIEW: 'user.view',
    CREATE: 'user.create',
    UPDATE: 'user.update',
    DELETE: 'user.delete',
    STATUS: 'user.status',
  },
};

export type RbacId = string | number | bigint;
export type NullableRbacId = RbacId | null;
