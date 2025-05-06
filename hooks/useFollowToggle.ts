import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useDebouncedCallback } from '@/hooks/useDebounce';
import { useToggleFollow } from '@/lib/queries/useFollowingQueries';

import { useRequireAuth } from './useRequireAuth';

/**
 * 작가 팔로우 상태를 토글하는 커스텀 훅
 * @param artistId - 작가 ID
 * @param initialIsFollowing - 초기 팔로우 상태
 */
export function useFollowToggle(
  artistId: number,
  initialIsFollowing: boolean,
  options?: {
    invalidateFollowingQueries?: boolean;
  }
) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing); // UI 상태
  const [serverFollowState, setServerFollowState] = useState(initialIsFollowing); // 서버와 동기화 된 상태

  const queryClient = useQueryClient();

  const { mutate: toggleFollow } = useToggleFollow();

  const debouncedToggleFollow = useDebouncedCallback((nextIsFollowing: boolean) => {
    // 서버 상태와 요청한 상태가 동일한 경우 API 요청 하지 않음
    if (nextIsFollowing === serverFollowState) return;

    toggleFollow(
      { artistId, isFollowing: serverFollowState },
      {
        onSuccess: async () => {
          // 성공 시 서버 상태를 요청한 상태로 변경
          setServerFollowState(nextIsFollowing);

          // TanStack Query를 사용하는 모든 query invalidate
          // e.g. 작가 피드 페이지 팔로우 기능 변경 시 layout과 팔로우 목록 페이지 invalidate
          if (options?.invalidateFollowingQueries) {
            queryClient.invalidateQueries({
              predicate: (query) => query.queryKey[0] === 'following',
            });
          }
        },
        onError: () => {
          // 요청 실패 시 서버 상태와 동일한 상태로 롤백
          setIsFollowing(serverFollowState);
        },
      }
    );
  }, 500);

  const toggleFollowState = () => {
    const nextIsFollowing = !isFollowing;
    setIsFollowing(nextIsFollowing);
    debouncedToggleFollow(nextIsFollowing);
  };

  const { checkAuth } = useRequireAuth();

  const toggleIsFollowing = () => {
    checkAuth(() => {
      toggleFollowState();
    });
  };

  return {
    isFollowing,
    toggleIsFollowing,
  };
}
