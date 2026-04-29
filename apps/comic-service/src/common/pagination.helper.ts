export function createPaginationMeta(page: number, limit: number, total: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPreviousPage: page > 1,
  };
}

export function toPrimaryKey(value: any): bigint {
  if (typeof value === 'bigint') return value;
  return BigInt(value);
}
