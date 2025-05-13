import { describe, expect, it } from 'vitest';

import { stableStringify } from '@/utils/object';

describe('deepStableStringify 테스트', () => {
  it('키 순서가 달라도 같은 문자열을 반환해야 함', () => {
    const obj1 = { b: 1, a: 2 };
    const obj2 = { a: 2, b: 1 };

    expect(stableStringify(obj1)).toBe(stableStringify(obj2));
  });

  it('값이 다르면 다른 문자열을 반환해야 함', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 2, b: 1 };

    expect(stableStringify(obj1)).not.toBe(stableStringify(obj2));
  });

  it('빈 객체는 "{}" 반환해야 함', () => {
    expect(stableStringify({})).toBe('{}');
  });

  it('키가 정렬된 순서대로 JSON 문자열이 되어야 함', () => {
    const obj = { z: 9, a: 1, m: 5 };
    expect(stableStringify(obj)).toBe('{"a":1,"m":5,"z":9}');
  });

  it('배열 내부 값이 정렬되어야 함', () => {
    const obj1 = { filters: ['M', 'S'] };
    const obj2 = { filters: ['S', 'M'] };

    expect(stableStringify(obj1)).toBe(stableStringify(obj2));
    expect(stableStringify(obj1)).toBe('{"filters":["M","S"]}'); // 정렬된 결과 기준
  });

  it('중첩 객체도 내부까지 재귀적으로 정렬해야 함', () => {
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
