import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { formatDateToYMD, formatRelativeTimeFromNow } from '@/utils/date';

describe('Date utility functions', () => {
  describe('formatDateToYMD (based on KST)', () => {
    it('should converts a UTC datetime string to KST formatted as yyyy.MM.dd', () => {
      const result = formatDateToYMD('2024-04-23T15:30:00.000Z');
      expect(result).toBe('2024.04.24');
    });

    it('should handles exact midnight in UTC correctly in KST', () => {
      const result = formatDateToYMD('2024-01-01T00:00:00.000Z');
      expect(result).toBe('2024.01.01');
    });

    it('should returns an empty string when given an empty string', () => {
      const result = formatDateToYMD('');
      expect(result).toBe('');
    });

    it('should returns an empty string when given null', () => {
      const result = formatDateToYMD(null);
      expect(result).toBe('');
    });

    it('should returns an empty string for an invalid date string', () => {
      const result = formatDateToYMD('invalid-date');
      expect(result).toBe('');
    });
  });

  describe('formatRelativeTimeFromNow (based on KST)', () => {
    const fixedNow = new Date('2024-04-23T15:30:00.000Z');

    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(fixedNow);
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('should returns "just now" for times within a few seconds ago', () => {
      const justNow = new Date(fixedNow.getTime() - 10 * 1000).toISOString();
      const result = formatRelativeTimeFromNow(justNow);
      expect(result).toBe('방금 전');
    });

    it('should returns "5 minutes ago" correctly', () => {
      const fiveMinutesAgo = new Date(fixedNow.getTime() - 5 * 60 * 1000).toISOString();
      const result = formatRelativeTimeFromNow(fiveMinutesAgo);
      expect(result).toBe('5분 전');
    });

    it('should returns "2 hours ago" correctly', () => {
      const twoHoursAgo = new Date(fixedNow.getTime() - 2 * 60 * 60 * 1000).toISOString();
      const result = formatRelativeTimeFromNow(twoHoursAgo);
      expect(result).toBe('2시간 전');
    });

    it('should returns an empty string for future timestamps', () => {
      const future = new Date(fixedNow.getTime() + 60 * 1000).toISOString();
      const result = formatRelativeTimeFromNow(future);
      expect(result).toBe('');
    });

    it('should returns an empty string for an empty input', () => {
      const result = formatRelativeTimeFromNow('');
      expect(result).toBe('');
    });

    it('should returns an empty string for null input', () => {
      const result = formatRelativeTimeFromNow(null);
      expect(result).toBe('');
    });

    it('should returns an empty string for invalid date strings', () => {
      const result = formatRelativeTimeFromNow('not-a-date');
      expect(result).toBe('');
    });
  });
});
