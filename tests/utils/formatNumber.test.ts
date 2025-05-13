import { describe, expect, it } from 'vitest';

import { formatNumberWithComma, formatOverThousand } from '@/utils/formatNumber';

describe('formatNumber utilities', () => {
  describe('formatNumberWithComma', () => {
    it('should formats a number with commas at thousand places', () => {
      expect(formatNumberWithComma(1000)).toBe('1,000');
      expect(formatNumberWithComma(123456789)).toBe('123,456,789');
    });

    it('should formats numeric strings correctly', () => {
      expect(formatNumberWithComma('34567')).toBe('34,567');
    });

    it('should handles zero correctly', () => {
      expect(formatNumberWithComma(0)).toBe('0');
    });

    it('should returns an empty string for invalid input', () => {
      expect(formatNumberWithComma('abc')).toBe('');
      expect(formatNumberWithComma(NaN)).toBe('');
    });

    it('should formats negative numbers correctly', () => {
      expect(formatNumberWithComma(-1234567)).toBe('-1,234,567');
    });

    it('should formats numbers with decimal points', () => {
      expect(formatNumberWithComma(12345.678)).toBe('12,345.678');
    });
  });

  describe('formatOverThousand', () => {
    it('should returns "999+" for numbers >= 1000', () => {
      expect(formatOverThousand(1000)).toBe('999+');
      expect(formatOverThousand(1500)).toBe('999+');
      expect(formatOverThousand('10000')).toBe('999+');
    });

    it('should returns the number as a string if < 1000', () => {
      expect(formatOverThousand(999)).toBe('999');
      expect(formatOverThousand(0)).toBe('0');
      expect(formatOverThousand('888')).toBe('888');
    });

    it('should returns an empty string for invalid input', () => {
      expect(formatOverThousand('abc')).toBe('');
      expect(formatOverThousand(NaN)).toBe('');
    });

    it('should handles negative numbers correctly', () => {
      expect(formatOverThousand(-1)).toBe('-1');
      expect(formatOverThousand('-999')).toBe('-999');
    });
  });
});
