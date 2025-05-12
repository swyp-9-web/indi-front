import { describe, expect, it } from 'vitest';

import { formatDateToYMD } from './date';

describe('formatDateToYMD (KST 기준)', () => {
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
