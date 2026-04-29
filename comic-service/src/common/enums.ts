export enum ComicStatus {
  draft = 'draft',
  published = 'published',
  scheduled = 'scheduled',
}

export enum ChapterStatus {
  draft = 'draft',
  published = 'published',
  scheduled = 'scheduled',
}

export const PUBLIC_COMIC_STATUSES = [ComicStatus.published, ComicStatus.scheduled];
export const PUBLIC_CHAPTER_STATUSES = [ChapterStatus.published, ChapterStatus.scheduled];
