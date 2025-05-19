import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useDebouncedCallback } from '@/hooks/useDebounce';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';
import { useToggleProductScrap } from '@/lib/queries/useProductsQueries';

import { useRequireAuth } from './useRequireAuth';

export function useScrapToggle(
  productId: number,
  initialIsScraped: boolean,
  initialScrapCount: number
): {
  isScraped: boolean;
  scrapCount: number;
  toggleIsScraped: () => void;
};

export function useScrapToggle(
  productId: number,
  initialIsScraped: boolean,
  initialScrapCount?: undefined
): {
  isScraped: boolean;
  scrapCount: undefined;
  toggleIsScraped: () => void;
};

/**
 * 제품 스크랩 상태를 토글하는 커스텀 훅
 * @param productId - 제품 ID
 * @param initialIsScraped - 초기 스크랩 여부
 */
export function useScrapToggle(
  productId: number,
  initialIsScraped: boolean,
  initialScrapCount?: number
) {
  const [isScraped, setIsScrapped] = useState(initialIsScraped); // UI 상태
  const [scrapCount, setScrapCount] = useState(initialScrapCount); // UI 상태
  const [serverScrapState, setServerScrapState] = useState(initialIsScraped); // 서버와 동기화 된 상태

  const queryClient = useQueryClient();

  const { mutate: toggleScrap } = useToggleProductScrap();

  const debouncedToggleScrap = useDebouncedCallback((nextIsScrapped: boolean) => {
    // 서버 상태와 요청한 상태가 동일한 경우 API 요청 하지 않음
    if (nextIsScrapped === serverScrapState) return;

    toggleScrap(
      { productId, isScraped: serverScrapState },
      {
        onSuccess: () => {
          // 성공 시 서버 상태를 요청한 상태로 변경
          setServerScrapState(nextIsScrapped);

          // 스크랩 관련 query invalidate
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === QUERY_KEYS.products.all[0],
          });
        },
      }
    );
  }, 300);

  const toggleScrapState = () => {
    const nextIsScrapped = !isScraped;

    setIsScrapped(nextIsScrapped);
    setScrapCount((prev) => (prev !== undefined ? (nextIsScrapped ? prev + 1 : prev - 1) : prev));

    debouncedToggleScrap(nextIsScrapped);
  };

  // 인증 상태 확인
  const { checkAuth } = useRequireAuth();

  const toggleIsScraped = () => {
    checkAuth(() => {
      toggleScrapState();
    });
  };

  return {
    isScraped,
    scrapCount,
    toggleIsScraped,
  };
}
