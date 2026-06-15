import { jitterTtl } from '../../src/helpers/jitter.helper';

describe('jitterTtl', () => {
  it('stays within [base, base + ceil(base*ratio)] for the default ratio', () => {
    for (let i = 0; i < 200; i++) {
      const v = jitterTtl(60); // spread = ceil(60*0.25) = 15
      expect(v).toBeGreaterThanOrEqual(60);
      expect(v).toBeLessThanOrEqual(75);
    }
  });

  it('honours a custom ratio', () => {
    for (let i = 0; i < 200; i++) {
      const v = jitterTtl(100, 0.5); // spread = 50
      expect(v).toBeGreaterThanOrEqual(100);
      expect(v).toBeLessThanOrEqual(150);
    }
  });

  it('returns integer values', () => {
    expect(Number.isInteger(jitterTtl(60))).toBe(true);
  });

  it('returns base unchanged for non-positive or non-finite input', () => {
    expect(jitterTtl(0)).toBe(0);
    expect(jitterTtl(-5)).toBe(-5);
    expect(jitterTtl(Number.NaN)).toBeNaN();
  });

  it('actually varies across calls (not constant)', () => {
    const values = new Set(Array.from({ length: 50 }, () => jitterTtl(1000)));
    expect(values.size).toBeGreaterThan(1);
  });
});
