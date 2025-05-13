import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { formatDateToYMD, formatRelativeTimeFromNow } from '@/utils/date';

describe('Date 관련 유틸 함수 테스트', () => {
  describe('formatDateToYMD', () => {
    it('UTC 문자열을 KST 기준 yyyy.MM.dd 형식으로 변환한다', () => {
      const result = formatDateToYMD('2024-04-23T15:30:00.000Z');
      expect(result).toBe('2024.04.24');
    });

    it('정확한 자정 시간도 KST 기준으로 처리한다', () => {
      const result = formatDateToYMD('2024-01-01T00:00:00.000Z');
      expect(result).toBe('2024.01.01');
    });

    it('빈 문자열을 입력하면 빈 문자열을 반환한다', () => {
      const result = formatDateToYMD('');
      expect(result).toBe('');
    });

    it('null 입력 시 빈 문자열을 반환한다', () => {
      const result = formatDateToYMD(null);
      expect(result).toBe('');
    });

    it('잘못된 날짜 문자열 입력 시 빈 문자열을 반환한다', () => {
      const result = formatDateToYMD('invalid-date');
      expect(result).toBe('');
    });
  });

  describe('formatRelativeTimeFromNow (KST 기준)', () => {
    const fixedNow = new Date('2024-04-23T15:30:00.000Z');

    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(fixedNow); // 테스트 기준 시간 고정
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('방금 전이면 "방금 전"을 반환한다', () => {
      const justNow = new Date(fixedNow.getTime() - 10 * 1000).toISOString();
      const result = formatRelativeTimeFromNow(justNow);
      expect(result).toBe('방금 전');
    });

    it('5분 전이면 "5분 전"을 반환한다', () => {
      const fiveMinutesAgo = new Date(fixedNow.getTime() - 5 * 60 * 1000).toISOString();
      const result = formatRelativeTimeFromNow(fiveMinutesAgo);
      expect(result).toBe('5분 전');
    });

    it('2시간 전이면 "2시간 전"을 반환한다', () => {
      const twoHoursAgo = new Date(fixedNow.getTime() - 2 * 60 * 60 * 1000).toISOString();
      const result = formatRelativeTimeFromNow(twoHoursAgo);
      expect(result).toBe('2시간 전');
    });

    it('미래 시간이면 빈 문자열을 반환한다', () => {
      const future = new Date(fixedNow.getTime() + 60 * 1000).toISOString();
      const result = formatRelativeTimeFromNow(future);
      expect(result).toBe('');
    });

    it('빈 문자열 입력 시 빈 문자열을 반환한다', () => {
      const result = formatRelativeTimeFromNow('');
      expect(result).toBe('');
    });

    it('null 입력 시 빈 문자열을 반환한다', () => {
      const result = formatRelativeTimeFromNow(null);
      expect(result).toBe('');
    });

    it('잘못된 날짜 문자열 입력 시 빈 문자열을 반환한다', () => {
      const result = formatRelativeTimeFromNow('not-a-date');
      expect(result).toBe('');
    });
  });
});
