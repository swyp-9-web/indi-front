import { useState } from 'react';

import { useDebouncedCallback } from '@/hooks/useDebounce';
import { useToggleFollow } from '@/lib/queries/useFollowingQueries';

/**
 * 작가 팔로우 상태를 토글하는 커스텀 훅
 * @param artistId - 작가 ID
 * @param initialIsFollowing - 초기 팔로우 상태
 */
export function useFollowToggle(artistId: number, initialIsFollowing: boolean) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing); // UI 상태
  const [serverFollowState, setServerFollowState] = useState(initialIsFollowing); // 서버와 동기화 된 상태

  const { mutate: toggleFollow } = useToggleFollow();

  const debouncedToggleFollow = useDebouncedCallback((nextIsFollowing: boolean) => {
    // 서버 상태와 요청한 상태가 동일한 경우 API 요청 하지 않음
    if (nextIsFollowing === serverFollowState) return;

    toggleFollow(
      { artistId, isFollowing: serverFollowState },
      {
        onSuccess: () => {
          // 성공 시 서버 상태를 요청한 상태로 변경
          setServerFollowState(nextIsFollowing);
        },
        onError: () => {
          // 요청 실패 시 서버 상태와 동일한 상태로 롤백
          setIsFollowing(serverFollowState);
        },
      }
    );
  }, 500);

  const toggleIsFollowing = () => {
    const nextIsFollowing = !isFollowing;
    setIsFollowing(nextIsFollowing);
    debouncedToggleFollow(nextIsFollowing);
  };

  return {
    isFollowing,
    toggleIsFollowing,
  };
}
