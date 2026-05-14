export enum NotificationType {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export const NotificationTypeOptions = [
  { id: NotificationType.info, name: 'Thông tin' },
  { id: NotificationType.success, name: 'Thành công' },
  { id: NotificationType.warning, name: 'Cảnh báo' },
  { id: NotificationType.error, name: 'Lỗi' },
];
