import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { revalidateArtistTag } from '@/app/actions/revalidate';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import { FollowingArtistsResponse, FollowingPreviewResponse } from '@/lib/apis/following.type';
import { QUERY_KEYS } from '@/lib/queries/queryKeys';
import { useToggleFollow } from '@/lib/queries/useFollowingQueries';
import toast from '@/lib/toast';

import { useRequireAuth } from './useRequireAuth';

/**
 * 작가 팔로우 상태를 토글하는 커스텀 훅
 *
 * - 클라이언트에서 UI용 팔로우 상태와 서버 상태를 분리하여 관리합니다.
 * - 중복 요청 방지를 위해 delay 200의 debounce 처리가 포함되어 있습니다.
 * - 성공 시 React Query 캐시를 직접 수정하거나 invalidate합니다. (invalidate 관련 옵션 제공)
 * - SSR 페이지에서 initial 값이 변경되었을 때 로컬 상태를 동기화합니다.
 *
 * @param artistId - 팔로우/언팔로우할 작가의 ID
 * @param initialIsFollowing - 초기 팔로우 상태 (React Query 캐시 또는 SSR에서 전달받은 값)
 * @param options - 캐시 무효화 옵션 객체
 * @param options.invalidateFollowingQueries - true인 경우, 'following'으로 시작하는 모든 쿼리를 invalidate합니다 (예: layout 갱신)
 * @param options.invalidateFollowingPreview - true인 경우, following preview 쿼리를 invalidate합니다 (예: preview 리스트 갱신)
 *
 * @returns isFollowing - 현재 UI에 표시할 팔로우 상태
 * @returns toggleIsFollowing - 로그인 체크 후 팔로우 상태를 토글하는 함수
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

          // 팔로잉 프리뷰 쿼리 데이터 변경
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

          // 팔로잉 목록 쿼리 데이터 변경
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
              predicate: (query) => query.queryKey[0] === QUERY_KEYS.following.all[0],
            });
          }

          // 팔로우 페이지의 첫 번째 목록에서 변화가 생기는 경우 preview invalidate
          if (options?.invalidateFollowingPreview) {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.following.preview });
          }

          toast.default(
            nextIsFollowing ? '작가 팔로우를 시작했습니다' : '작가 팔로우를 취소했습니다'
          );
        },
        onError: async () => {
          // 요청 실패 시 UI 상태 롤백
          setServerFollowState(serverFollowState);

          // 요청 실패 시 서버 상태와 동기화 진행
          await revalidateArtistTag(String(artistId));
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === QUERY_KEYS.following.all[0],
          });

          toast.error('잠시 후 다시 시도해주세요');
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
