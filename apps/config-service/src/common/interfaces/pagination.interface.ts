export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage?: number;
  previousPage?: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
  format?: string;
  select?: any;
  include?: any;
  filter?: Record<string, any>;
  skipCount?: boolean;
  maxLimit?: number;
}
