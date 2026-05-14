export enum PostStatus {
  draft = 'draft',
  scheduled = 'scheduled',
  published = 'published',
  archived = 'archived',
}

// Public listing only shows posts that are visible right now. Scheduling
// should flip status to `published` when publishedAt arrives, instead of
// leaking future-dated drafts publicly.
export const PUBLIC_POST_STATUSES = [PostStatus.published];

export const PostStatusOptions = [
  { id: PostStatus.draft, name: 'Nháp' },
  { id: PostStatus.scheduled, name: 'Lên lịch' },
  { id: PostStatus.published, name: 'Đã xuất bản' },
  { id: PostStatus.archived, name: 'Đã lưu trữ' },
];
