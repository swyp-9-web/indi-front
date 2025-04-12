// utils/sum.test.ts
import { describe, expect, it } from 'vitest';

import { sum } from './sum';

describe('sum 함수 테스트', () => {
  it('1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
