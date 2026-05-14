export enum CommentStatus {
  visible = 'visible',
  hidden = 'hidden',
  spam = 'spam',
  deleted = 'deleted',
}

export const CommentStatusOptions = [
  { id: CommentStatus.visible, name: 'Hiển thị' },
  { id: CommentStatus.hidden, name: 'Ẩn' },
  { id: CommentStatus.spam, name: 'Spam' },
  { id: CommentStatus.deleted, name: 'Đã xóa' },
];
