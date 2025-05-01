/**
 * 객체의 키를 정렬한 후 JSON 문자열로 변환합니다.
 *
 * React Query와 같은 캐싱 라이브러리에서 queryKey를 안정적으로 생성할 때 유용합니다.
 * 객체의 키 순서가 달라질 경우 다른 캐시로 인식될 수 있기 때문에,
 * 이 함수를 통해 키 순서를 고정하여 일관된 문자열을 생성할 수 있습니다.
 *
 * @param obj - JSON으로 변환할 대상 객체
 * @returns 키가 알파벳 순으로 정렬된 JSON 문자열
 */
export const stableStringify = (obj: any): string => {
  const sortRecursively = (value: any): any => {
    if (Array.isArray(value)) return value.slice().sort();

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return Object.keys(value)
        .sort()
        .reduce(
          (acc, key) => {
            acc[key] = sortRecursively(value[key]);
            return acc;
          },
          {} as Record<string, any>
        );
    }

    return value;
  };

  return JSON.stringify(sortRecursively(obj));
};
