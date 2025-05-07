import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { revalidateArtistTag } from '@/app/actions/revalidate';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { FollowingArtistsResponse, FollowingPreviewResponse } from '@/lib/apis/following.type';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';
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
    invalidateFollowingPreview?: boolean;
  }
) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing); // UI 상태
  const [serverFollowState, setServerFollowState] = useState(initialIsFollowing); // 서버와 동기화 된 상태

  // 캐싱된 값(initialIsFollowing)이 변경되었을 때, 리렌더링을 위한 useEffect
  // SSR 페이지(작가 피드 페이지)의 값 변경 반영 및 setQueryData로 변경된 값 반영
  useEffect(() => {
    setIsFollowing(initialIsFollowing);
    setServerFollowState(initialIsFollowing);
  }, [initialIsFollowing]);

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

          // 팔로우 변경시 작가 피드 페이지 갱신, 바로 반영되지는 않고 페이지 재요청시 갱신됨
          await revalidateArtistTag(String(artistId));

          queryClient.setQueryData(
            QUERY_KEYS.following.preview,
            (prevData: FollowingPreviewResponse | undefined) => {
              if (!prevData) return prevData;
              return {
                ...prevData,
                result: {
                  ...prevData.result,
                  followingArtists: prevData.result.followingArtists.map((artist) =>
                    artist.id === artistId ? { ...artist, isFollowing: nextIsFollowing } : artist
                  ),
                },
              };
            }
          );

          queryClient.setQueryData(
            QUERY_KEYS.following.artists({ limit: 5, page: 1 }),
            (prevData: FollowingArtistsResponse | undefined) => {
              if (!prevData) return prevData;
              return {
                ...prevData,
                result: {
                  ...prevData.result,
                  artists: prevData.result.artists.map((artist) =>
                    artist.id === artistId ? { ...artist, isFollowing: nextIsFollowing } : artist
                  ),
                },
              };
            }
          );

          // TanStack Query를 사용하는 모든 query invalidate
          // e.g. 작가 피드 페이지 팔로우 기능 변경 시 layout과 팔로우 목록 페이지 invalidate
          if (options?.invalidateFollowingQueries) {
            queryClient.invalidateQueries({
              predicate: (query) => query.queryKey[0] === 'following',
            });
          }

          // 팔로우 페이지의 첫 번째 목록에서 변화가 생기는 경우 preview invalidate
          if (options?.invalidateFollowingPreview) {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.following.preview });
          }
        },
        onError: async () => {
          // 요청 실패 시 UI 상태 롤백
          setServerFollowState(serverFollowState);

          // 요청 실패 시 서버 상태와 동기화 진행
          await revalidateArtistTag(String(artistId));
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === 'following',
          });
        },
      }
    );
  }, 200);

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
