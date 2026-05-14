export enum BannerStatus {
  draft = 'draft',
  active = 'active',
  inactive = 'inactive',
}

export enum BannerLinkTarget {
  self = '_self',
  blank = '_blank',
}

export const BannerStatusOptions = [
  { id: BannerStatus.draft, name: 'Nháp' },
  { id: BannerStatus.active, name: 'Hoạt động' },
  { id: BannerStatus.inactive, name: 'Ngừng hoạt động' },
];

export const BannerLinkTargetOptions = [
  { id: BannerLinkTarget.self, name: 'Cùng tab' },
  { id: BannerLinkTarget.blank, name: 'Tab mới' },
];
