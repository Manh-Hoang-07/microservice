export enum PostStatus {
  draft = 'draft',
  scheduled = 'scheduled',
  published = 'published',
  archived = 'archived',
}

export const PUBLIC_POST_STATUSES = [PostStatus.published, PostStatus.scheduled];
