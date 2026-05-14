export enum NotificationStatus {
  active = 'active',
  archived = 'archived',
  deleted = 'deleted',
}

export const NotificationStatusOptions = [
  { id: NotificationStatus.active, name: 'Hoạt động' },
  { id: NotificationStatus.archived, name: 'Đã lưu trữ' },
  { id: NotificationStatus.deleted, name: 'Đã xóa' },
];
