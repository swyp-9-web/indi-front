import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useDebounce - 입력 값을 디바운스하여 일정 시간 후 최종 값 반환
 * @param value - 디바운스할 값
 * @param delay - 디바운스 대기 시간 (ms)
 * @returns - 디바운스된 값
 */
export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedCallback - 디바운스된 콜백 함수 반환
 * @param callback - 실행할 콜백 함수
 * @param delay - 디바운스 대기 시간 (ms)
 * @returns - 디바운스된 콜백 함수
 */
export function useDebouncedCallback<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delay = 300
): (...args: TArgs) => void {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // 최신 콜백을 참조할 수 있도록 ref에 저장
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 컴포넌트 언마운트 시 남아있는 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // 딜레이 변경 전까지 동일한 디바운스 함수 사용
  const debouncedFn = useCallback(
    (...args: TArgs) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  return debouncedFn;
}
