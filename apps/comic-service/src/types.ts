// Change this type when migrating to a different DB or ID strategy
export type PrimaryKey = bigint;

export function toPrimaryKey(value: any): PrimaryKey {
  if (typeof value === 'bigint') return value;
  return BigInt(value);
}
