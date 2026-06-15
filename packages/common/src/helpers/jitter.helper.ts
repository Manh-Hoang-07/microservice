/**
 * Add a small random spread to a cache TTL so entries created in the same
 * burst — e.g. right after an RBAC version bump invalidates everything — do
 * not all expire at the same instant and stampede the upstream on refresh.
 *
 * Returns `baseSeconds + [0, ceil(baseSeconds * ratio)]`.
 *
 * @example jitterTtl(60)        // → 60..75
 * @example jitterTtl(60, 0.5)   // → 60..90
 */
export function jitterTtl(baseSeconds: number, ratio = 0.25): number {
  if (!Number.isFinite(baseSeconds) || baseSeconds <= 0) return baseSeconds;
  const spread = Math.ceil(baseSeconds * ratio);
  return baseSeconds + Math.floor(Math.random() * (spread + 1));
}
