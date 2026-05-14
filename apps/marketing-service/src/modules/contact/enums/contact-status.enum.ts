export enum ContactStatus {
  pending = 'Pending',
  read = 'Read',
  replied = 'Replied',
  closed = 'Closed',
}

export const ContactStatusOptions = [
  { id: ContactStatus.pending, name: 'Chờ xử lý' },
  { id: ContactStatus.read, name: 'Đã đọc' },
  { id: ContactStatus.replied, name: 'Đã trả lời' },
  { id: ContactStatus.closed, name: 'Đã đóng' },
];
