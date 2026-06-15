import { createHash } from 'crypto';

/**
 * JSON.stringify replacer that serialises BigInt as a string so cache writes
 * never throw "Do not know how to serialize a BigInt" (which, when wrapped in a
 * `.catch(() => {})`, silently disables the cache).
 */
export function bigintReplacer(_key: string, value: unknown): unknown {
  return typeof value === 'bigint' ? value.toString() : value;
}

/**
 * Stable JSON.stringify: object keys are emitted in sorted order so that two
 * logically-equal objects (regardless of key insertion order) hash identically.
 * BigInt-safe.
 */
export function stableStringify(value: unknown): string {
  return JSON.stringify(sortValue(value), bigintReplacer);
}

function sortValue(value: unknown): unknown {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(sortValue);
  const obj = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(obj).sort()) {
    if (obj[key] === undefined) continue;
    out[key] = sortValue(obj[key]);
  }
  return out;
}

/**
 * Build a deterministic suffix that distinguishes one query variant from
 * another. Filter + pagination/sort options are normalised and hashed so the
 * resulting key stays short and bounded regardless of input size.
 */
export function buildVariantSuffix(parts: Record<string, unknown>): string {
  const normalised = stableStringify(parts);
  return createHash('sha1').update(normalised).digest('hex').slice(0, 16);
}
