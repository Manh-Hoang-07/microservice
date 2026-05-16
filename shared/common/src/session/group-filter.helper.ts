import { session } from './session-context.storage';

/**
 * Returns groupId from x-group-id header. Used for data filtering only,
 * not for authorization.
 */
export function getSessionGroupId(): bigint | null {
  return session()?.groupId ?? null;
}

/**
 * Returns current authenticated user's ID from session (req.user.sub).
 * Use in services instead of passing actorId as parameter.
 */
export function getSessionUserId(): bigint | null {
  const uid = session()?.userId;
  if (!uid) return null;
  try { return BigInt(uid); } catch { return null; }
}
