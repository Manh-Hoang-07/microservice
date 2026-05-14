export enum UserStatus {
  active = 'active',
  inactive = 'inactive',
  locked = 'locked',
}

export const UserStatusOptions = [
  { id: UserStatus.active, name: 'Hoạt động' },
  { id: UserStatus.inactive, name: 'Ngừng hoạt động' },
  { id: UserStatus.locked, name: 'Đã khóa' },
];
