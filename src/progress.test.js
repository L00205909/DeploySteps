import { describe, expect, it } from 'vitest';
import { calculateProgress } from './progress.js';

describe('calculateProgress', () => {
  it('calculates the completed percentage', () => {
    expect(calculateProgress(2, 3)).toBe(67);
  });

  it('returns zero when there are no steps', () => {
    expect(calculateProgress(0, 0)).toBe(0);
  });
});
