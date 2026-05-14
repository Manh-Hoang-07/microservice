export enum StatsSortBy {
  views = 'views',
  follows = 'follows',
  rating = 'rating',
}

export const StatsSortByOptions = [
  { id: StatsSortBy.views, name: 'Lượt xem' },
  { id: StatsSortBy.follows, name: 'Lượt theo dõi' },
  { id: StatsSortBy.rating, name: 'Đánh giá' },
];
