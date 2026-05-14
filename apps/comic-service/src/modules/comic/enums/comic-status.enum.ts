export enum ComicStatus {
  draft = 'draft',
  published = 'published',
  scheduled = 'scheduled',
}

// Public listing only shows comics that are actually visible right now.
// `scheduled` previously leaked future-dated content publicly; the
// scheduling flow should flip status to `published` when the time arrives.
export const PUBLIC_COMIC_STATUSES = [ComicStatus.published];

export const ComicStatusOptions = [
  { id: ComicStatus.draft, name: 'Nháp' },
  { id: ComicStatus.published, name: 'Đã xuất bản' },
  { id: ComicStatus.scheduled, name: 'Lên lịch' },
];
