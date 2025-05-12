import { parseISO } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';

/**
 * ISO 8601 형식의 날짜 문자열을 KST 기준 "yyyy.MM.dd" 형식으로 변환합니다.
 *
 * @param dateString - 변환할 ISO 8601 날짜 문자열 (예: "2024-04-23T15:30:00.000Z")
 * @returns "yyyy.MM.dd" 형식의 문자열 (KST 기준) 또는 빈 문자열
 *
 * @example
 * formatDateToYMD("2024-04-23T15:30:00.000Z");
 * // 반환값: "2024.04.24"
 */
export function formatDateToYMD(dateString: string | null | undefined): string {
  if (!dateString) return '';

  const timeZone = 'Asia/Seoul';

  try {
    const parsedDate = parseISO(dateString);
    const zonedDate = toZonedTime(parsedDate, timeZone);

    return format(zonedDate, 'yyyy.MM.dd', { timeZone });
  } catch {
    return '';
  }
}
