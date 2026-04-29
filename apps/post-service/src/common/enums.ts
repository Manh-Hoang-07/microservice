export enum PostStatus {
  draft = 'draft',
  scheduled = 'scheduled',
  published = 'published',
  archived = 'archived',
}

export enum PostType {
  text = 'text',
  video = 'video',
  image = 'image',
  audio = 'audio',
}

export const PUBLIC_POST_STATUSES = [PostStatus.published, PostStatus.scheduled];
