import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useDebounce, useDebounceAdvanced } from './useDebounce';

describe('useDebounce', () => {
  it('should update the value after the delay', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'changed', delay: 300 });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('changed');

    vi.useRealTimers();
  });

  it('should handle dynamic delay changes properly', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    rerender({ value: 'changed', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(499);
    });
    let debouncedValue = result.current;
    expect(debouncedValue).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    debouncedValue = result.current;
    expect(debouncedValue).toBe('changed');

    vi.useRealTimers();
  });

  it('should clear the timer on unmount', () => {
    vi.useFakeTimers();

    const { unmount } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // 타이머가 정상 clear되면 아무 문제 없이 통과
    vi.useRealTimers();
  });

  it('should update immediately if delay is 0', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 0 },
    });

    act(() => {
      rerender({ value: 'changed', delay: 0 });
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    const debouncedValue = result.current;
    expect(debouncedValue).toBe('changed');

    vi.useRealTimers();
  });
});

describe('useDebounceAdvanced', () => {
  it('should update the value after the delay', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceAdvanced(value, delay),
      {
        initialProps: { value: 'initial', delay: 300 },
      }
    );

    act(() => {
      rerender({ value: 'changed', delay: 300 });
    });

    let [debouncedValue] = result.current;

    act(() => {
      vi.advanceTimersByTime(299);
    });
    [debouncedValue] = result.current;
    expect(debouncedValue).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    [debouncedValue] = result.current;
    expect(debouncedValue).toBe('changed');

    vi.useRealTimers();
  });

  it('should manage the isDebouncing state properly', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceAdvanced(value, delay),
      {
        initialProps: { value: 'initial', delay: 300 },
      }
    );

    let [, isDebouncing] = result.current;

    expect(isDebouncing).toBe(true);

    act(() => {
      rerender({ value: 'changed', delay: 300 });
    });

    [, isDebouncing] = result.current;
    expect(isDebouncing).toBe(true);

    act(() => {
      vi.advanceTimersByTime(299);
    });
    [, isDebouncing] = result.current;
    expect(isDebouncing).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    [, isDebouncing] = result.current;
    expect(isDebouncing).toBe(false);

    vi.useRealTimers();
  });

  it('should handle dynamic delay changes properly', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceAdvanced(value, delay),
      {
        initialProps: { value: 'initial', delay: 300 },
      }
    );

    rerender({ value: 'changed', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(499);
    });
    let [debouncedValue, isDebouncing] = result.current;
    expect(debouncedValue).toBe('initial');
    expect(isDebouncing).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    [debouncedValue, isDebouncing] = result.current;
    expect(debouncedValue).toBe('changed');
    expect(isDebouncing).toBe(false);

    vi.useRealTimers();
  });

  it('should clear the timer on unmount', () => {
    vi.useFakeTimers();

    const { unmount } = renderHook(({ value, delay }) => useDebounceAdvanced(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    vi.useRealTimers();
  });

  it('should update immediately if delay is 0', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceAdvanced(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 },
      }
    );

    act(() => {
      rerender({ value: 'changed', delay: 0 });
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    const [debouncedValue] = result.current;
    expect(debouncedValue).toBe('changed');

    vi.useRealTimers();
  });
});
