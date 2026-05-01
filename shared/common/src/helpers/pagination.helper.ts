export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface QueryOptions {
  page: number;
  skip: number;
  take: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export function createPaginationMeta(options: QueryOptions, total: number): PaginationMeta {
  return {
    page: options.page,
    limit: options.take,
    total,
    totalPages: Math.ceil(total / options.take),
    hasNextPage: options.page * options.take < total,
    hasPreviousPage: options.page > 1,
  };
}

export function parseQueryOptions(query: any): QueryOptions {
  const page = Math.max(Number(query.page) || 1, 1);
  const take = Math.max(Number(query.limit) || 10, 1);
  const skip = (page - 1) * take;
  const sortBy: string | undefined = query.sort_by || undefined;
  const order: 'asc' | 'desc' | undefined =
    query.order === 'asc' || query.order === 'desc' ? query.order : undefined;
  return { page, skip, take, sortBy, order };
}

export function toPrimaryKey(value: any): bigint {
  if (typeof value === 'bigint') return value;
  return BigInt(value);
}
