export enum ComicStatus {
  draft = 'draft',
  published = 'published',
  scheduled = 'scheduled',
}

export const PUBLIC_COMIC_STATUSES = [ComicStatus.published, ComicStatus.scheduled];
