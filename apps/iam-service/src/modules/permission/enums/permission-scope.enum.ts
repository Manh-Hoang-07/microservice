export enum PermissionScope {
  context = 'context',
  system = 'system',
}

export const PermissionScopeOptions = [
  { id: PermissionScope.context, name: 'Context' },
  { id: PermissionScope.system, name: 'System' },
];
