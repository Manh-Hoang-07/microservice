export enum ChapterStatus {
  draft = 'draft',
  published = 'published',
  scheduled = 'scheduled',
}

export const PUBLIC_CHAPTER_STATUSES = [ChapterStatus.published, ChapterStatus.scheduled];
