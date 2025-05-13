import { describe, expect, it } from 'vitest';

import { stableStringify } from '@/utils/object';

describe('stableStringify', () => {
  it('should return the same string for objects with the same keys in different orders', () => {
    const obj1 = { b: 1, a: 2 };
    const obj2 = { a: 2, b: 1 };

    expect(stableStringify(obj1)).toBe(stableStringify(obj2));
  });

  it('should return different strings for objects with different values', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 2, b: 1 };

    expect(stableStringify(obj1)).not.toBe(stableStringify(obj2));
  });

  it('should return "{}" for an empty object', () => {
    expect(stableStringify({})).toBe('{}');
  });

  it('should produce JSON with keys sorted in ascending order', () => {
    const obj = { z: 9, a: 1, m: 5 };
    expect(stableStringify(obj)).toBe('{"a":1,"m":5,"z":9}');
  });

  it('should return the same string for arrays with the same elements in different orders (if sorting is applied)', () => {
    const obj1 = { filters: ['M', 'S'] };
    const obj2 = { filters: ['S', 'M'] };

    expect(stableStringify(obj1)).toBe(stableStringify(obj2));
    expect(stableStringify(obj1)).toBe('{"filters":["M","S"]}');
  });

  it('should recursively sort keys and array values in nested objects', () => {
    const obj1 = {
      a: {
        z: 1,
        b: ['B', 'A'],
      },
      c: 0,
    };

    const obj2 = {
      c: 0,
      a: {
        b: ['A', 'B'],
        z: 1,
      },
    };

    expect(stableStringify(obj1)).toBe(stableStringify(obj2));
    expect(stableStringify(obj1)).toBe('{"a":{"b":["A","B"],"z":1},"c":0}');
  });
});
