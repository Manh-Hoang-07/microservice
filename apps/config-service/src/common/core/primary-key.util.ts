export type DbIdType = 'bigint' | 'uuid' | 'objectid';

export function getDbIdType(): DbIdType {
  return (process.env.DB_ID_TYPE as DbIdType) || 'bigint';
}

export function toPrimaryKey(id: any): any {
  if (id === null || id === undefined || id === '') return id;

  if (typeof id === 'object' && 'id' in id) {
    return toPrimaryKey((id as any).id);
  }

  const idType = getDbIdType();

  if (idType === 'uuid' || idType === 'objectid') {
    return typeof id === 'string' ? id : String(id);
  }

  if (typeof id === 'bigint') return id;
  if (typeof id === 'number') return BigInt(id);
  if (typeof id === 'string' && /^\d+$/.test(id)) {
    try {
      return BigInt(id);
    } catch {
      return id;
    }
  }

  return id;
}

export type PrimaryKey = string | bigint | number;
