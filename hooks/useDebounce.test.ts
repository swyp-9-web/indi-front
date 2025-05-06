import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useDebounce, useDebouncedCallback } from './useDebounce';

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

describe('useDebouncedCallback', () => {
  it('should debounce the callback execution', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current('first');
      result.current('second');
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('second');

    vi.useRealTimers();
  });

  it('should reset timer on multiple calls', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current('a');
    });

    act(() => {
      vi.advanceTimersByTime(150);
      result.current('b');
    });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('b');

    vi.useRealTimers();
  });

  it('should execute immediately if delay is 0', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 0));

    act(() => {
      result.current('instant');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('instant');

    vi.useRealTimers();
  });

  it('should clear the timer on unmount', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current('value');
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
