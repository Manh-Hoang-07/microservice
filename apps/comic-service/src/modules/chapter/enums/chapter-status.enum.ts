export enum ChapterStatus {
  draft = 'draft',
  published = 'published',
  scheduled = 'scheduled',
}

export const PUBLIC_CHAPTER_STATUSES = [ChapterStatus.published, ChapterStatus.scheduled];

export const ChapterStatusOptions = [
  { id: ChapterStatus.draft, name: 'Nháp' },
  { id: ChapterStatus.published, name: 'Đã xuất bản' },
  { id: ChapterStatus.scheduled, name: 'Lên lịch' },
];
