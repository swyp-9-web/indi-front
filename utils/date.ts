import { formatDistanceStrict, parseISO } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';
import { ko } from 'date-fns/locale';

// 현재 서버에서 UTC 시각을 Z를 붙이지 않은 상태로 보내주어 생기는 오류를 수정하기 위한 함수
function normalizeToUTCISOString(dateString: string): string {
  if (!dateString) return '';
  return /Z$|[+-]\d{2}:\d{2}$/.test(dateString) ? dateString : dateString + 'Z';
}

/**
 * ISO 8601 형식의 날짜 문자열을 KST 기준 "yyyy.MM.dd" 형식으로 변환합니다.
 *
 * @param dateString - 변환할 ISO 8601 날짜 문자열 (예: "2024-04-23T15:30:00.000Z")
 * @returns "yyyy.MM.dd" 형식의 문자열 (KST 기준) 또는 빈 문자열
 */
export function formatDateToYMD(dateString: string | null | undefined): string {
  if (!dateString) return '';

  const timeZone = 'Asia/Seoul';

  try {
    const parsedDate = parseISO(normalizeToUTCISOString(dateString));
    const zonedDate = toZonedTime(parsedDate, timeZone);

    return format(zonedDate, 'yyyy.MM.dd', { timeZone });
  } catch {
    return '';
  }
}

/**
 * ISO 날짜 문자열을 받아 KST 기준으로 "HH.mm" 형식의 시각 문자열을 반환합니다.
 *
 * @param dateString - UTC ISO 8601 형식 문자열
 * @returns "HH.mm" 형식의 문자열 (예: "12.50")
 */
export function formatTimeToHourMinute(dateString: string | null | undefined): string {
  if (!dateString) return '';

  const timeZone = 'Asia/Seoul';

  try {
    const parsedDate = parseISO(normalizeToUTCISOString(dateString));
    const zonedDate = toZonedTime(parsedDate, timeZone);

    return format(zonedDate, 'HH.mm', { timeZone });
  } catch {
    return '';
  }
}

/**
 * ISO 날짜 문자열을 받아 KST 기준으로 "방금 전", "n분 전", "n년 전" 등의 상대 시간을 반환합니다.
 *
 * @param dateString - UTC ISO 8601 형식 문자열
 * @returns 한국어 상대 시간 문자열
 */
export function formatRelativeTimeFromNow(dateString: string | null | undefined): string {
  if (!dateString) return '';

  const timeZone = 'Asia/Seoul';

  try {
    const parsed = parseISO(normalizeToUTCISOString(dateString));

    const nowInKST = toZonedTime(new Date(), timeZone);
    const targetInKST = toZonedTime(parsed, timeZone);

    const diff = nowInKST.getTime() - targetInKST.getTime();

    if (diff < 0) return ''; // 미래 시간인 경우 처리 안 함
    if (diff < 60 * 1000) return '방금 전';

    return formatDistanceStrict(targetInKST, nowInKST, {
      addSuffix: true,
      locale: ko,
    });
  } catch {
    return '';
  }
}
