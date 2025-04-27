import { useEffect, useRef, useState } from 'react';

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
 * useDebounceAdvanced - 입력 값을 디바운스하여 일정 시간 후 최종 값 반환 + 로딩 상태
 * @param value - 디바운스할 값
 * @param delay - 디바운스 대기 시간 (ms)
 * @returns - [debouncedValue, isDebouncing]
 */
export function useDebounceAdvanced<T>(value: T, delay = 300): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsDebouncing(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return [debouncedValue, isDebouncing];
}
