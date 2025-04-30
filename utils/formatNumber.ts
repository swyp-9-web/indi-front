/**
 * 숫자를 천 단위마다 쉼표(,)로 구분된 문자열로 변환합니다.
 * @param value 숫자 또는 숫자 형태의 문자열
 * @returns 포맷팅된 문자열 (예: 1,000)
 */
export const formatNumberWithComma = (value: number | string): string => {
  const number = typeof value === 'string' ? Number(value) : value;

  if (isNaN(number)) return '';

  return number.toLocaleString('ko-KR');
};

/**
 * 숫자가 1000 이상이면 '999+'로, 아니면 그대로 반환합니다.
 * @param value 숫자 또는 숫자 형태의 문자열
 * @returns 문자열 (예: 1000 → '999+', 500 → '500')
 */
export const formatOverThousand = (value: number | string): string => {
  const number = typeof value === 'string' ? Number(value) : value;

  if (isNaN(number)) return '';

  return number >= 1000 ? '999+' : number.toString();
};
