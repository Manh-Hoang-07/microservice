import {
  bigintReplacer,
  buildVariantSuffix,
  stableStringify,
} from '../src/cache-key.util';

describe('cache-key.util', () => {
  describe('bigintReplacer / stableStringify', () => {
    it('serialises BigInt as string instead of throwing', () => {
      const value = { id: 10n, nested: { count: 5n }, name: 'x' };
      // Native JSON.stringify throws on BigInt — guard that our helper does not.
      expect(() => JSON.stringify(value)).toThrow(TypeError);
      const json = stableStringify(value);
      expect(JSON.parse(json)).toEqual({ id: '10', name: 'x', nested: { count: '5' } });
    });

    it('bigintReplacer leaves non-bigint values untouched', () => {
      expect(bigintReplacer('k', 'v')).toBe('v');
      expect(bigintReplacer('k', 7)).toBe(7);
      expect(bigintReplacer('k', 9n)).toBe('9');
    });

    it('produces key-order-independent output', () => {
      expect(stableStringify({ a: 1, b: 2 })).toBe(stableStringify({ b: 2, a: 1 }));
    });

    it('drops undefined values for stable hashing', () => {
      expect(stableStringify({ a: 1, b: undefined })).toBe(stableStringify({ a: 1 }));
    });
  });

  describe('buildVariantSuffix', () => {
    it('returns a short, deterministic hex suffix', () => {
      const suffix = buildVariantSuffix({ filter: { status: 'active' }, options: { page: 1 } });
      expect(suffix).toMatch(/^[0-9a-f]{16}$/);
      expect(buildVariantSuffix({ filter: { status: 'active' }, options: { page: 1 } })).toBe(suffix);
    });

    it('yields different suffixes for different queries', () => {
      const page1 = buildVariantSuffix({ filter: {}, options: { page: 1, take: 10 } });
      const page2 = buildVariantSuffix({ filter: {}, options: { page: 2, take: 10 } });
      const limit = buildVariantSuffix({ filter: {}, options: { page: 1, take: 50 } });
      const filtered = buildVariantSuffix({ filter: { type: 'gold' }, options: { page: 1, take: 10 } });

      expect(new Set([page1, page2, limit, filtered]).size).toBe(4);
    });

    it('does not throw on BigInt filter values', () => {
      expect(() =>
        buildVariantSuffix({ filter: { projectId: 99n }, options: { page: 1 } }),
      ).not.toThrow();
    });
  });
});
