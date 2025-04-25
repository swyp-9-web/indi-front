import { describe, expect, it } from 'vitest';

import { formatNumberWithComma } from './formatNumber';

describe('formatNumber utilities', () => {
  describe('formatNumberWithComma', () => {
    it('formats a number with commas at thousand places', () => {
      expect(formatNumberWithComma(1000)).toBe('1,000');
      expect(formatNumberWithComma(123456789)).toBe('123,456,789');
    });

    it('formats numeric strings correctly', () => {
      expect(formatNumberWithComma('34567')).toBe('34,567');
    });

    it('handles zero correctly', () => {
      expect(formatNumberWithComma(0)).toBe('0');
    });

    it('returns an empty string for invalid input', () => {
      expect(formatNumberWithComma('abc')).toBe('');
      expect(formatNumberWithComma(NaN)).toBe('');
    });

    it('formats negative numbers correctly', () => {
      expect(formatNumberWithComma(-1234567)).toBe('-1,234,567');
    });

    it('formats numbers with decimal points', () => {
      expect(formatNumberWithComma(12345.678)).toBe('12,345.678');
    });
  });

  // 이후에 formatNumber.ts 파일에 추가되는 함수 테스트는 아래와 같이 진행
  // describe('formatCurrency', () => {
  //   it('formats number as currency', () => {
  //     ...
  //   });
  // });
});
