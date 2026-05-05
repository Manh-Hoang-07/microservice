/**
 * In-memory store for token blacklist entries.
 * Stores token → unix expiry timestamp (seconds).
 */
export class TokenLocalStore {
  private readonly map = new Map<string, number>();
  private readonly maxEntries: number;

  constructor(maxEntries = 10_000) {
    this.maxEntries = maxEntries;
  }

  get size(): number {
    return this.map.size;
  }

  add(token: string, ttlSeconds: number): void {
    this.ensureCapacity();
    const now = epochSeconds();
    this.map.set(token, now + Math.max(1, ttlSeconds | 0));
  }

  has(token: string): boolean {
    const exp = this.map.get(token);
    if (exp === undefined) return false;
    if (exp <= epochSeconds()) {
      this.map.delete(token);
      return false;
    }
    return true;
  }

  cleanup(): number {
    const now = epochSeconds();
    let removed = 0;
    for (const [token, exp] of this.map.entries()) {
      if (exp <= now) {
        this.map.delete(token);
        removed++;
      }
    }
    return removed;
  }

  stats(maxEntries: number) {
    return {
      size: this.map.size,
      maxSize: maxEntries,
      utilizationPercent: (this.map.size / maxEntries) * 100,
    };
  }

  private ensureCapacity(): void {
    if (this.map.size < this.maxEntries) return;
    this.cleanup();
    if (this.map.size >= this.maxEntries) {
      const firstKey = this.map.keys().next().value;
      if (firstKey !== undefined) this.map.delete(firstKey);
    }
  }
}

function epochSeconds(): number {
  return Math.floor(Date.now() / 1000);
}
