import { toPrimaryKey } from '../../../common/core/primary-key.util';

export function buildConfigPayload<T extends object>(
  dto: T,
  bigIntFields: string[],
  updatedBy?: any,
  existing?: any,
): any {
  const payload: any = { ...dto };

  bigIntFields.forEach((field) => {
    if (payload[field] !== undefined) {
      payload[field] = payload[field] ? toPrimaryKey(payload[field]) : null;
    }
  });

  if (updatedBy) {
    const pk = toPrimaryKey(updatedBy);
    if (!existing) {
      payload.created_user_id = pk;
    }
    payload.updated_user_id = pk;
  }

  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  return payload;
}
