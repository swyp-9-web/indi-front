import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import { revalidateArtistTag } from '@/app/actions/revalidate';

import { editArtistProfile, fetchUserSummary, logoutUser, setUserCookie } from '../apis/user.api';
import { UserSummaryResponse } from '../apis/user.type';

import { QUERY_KEYS } from './queryKeys';

/**
 * OAuth 로그인 콜백 처리 훅입니다.
 *
 * 전달받은 `sessionId`를 서버에 전송하여 쿠키를 설정하고, (Next API Route)
 * 이후 현재 로그인한 유저의 요약 정보를 요청하여 캐시에 저장합니다.
 */
export const useLoginCallback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string): Promise<UserSummaryResponse> => {
      await setUserCookie(sessionId);
      const user = await fetchUserSummary({ runtime: 'client' });
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.summary });
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'products' });
    },
  });
};

/**
 * 현재 로그인한 사용자의 요약 정보를 불러오는 React Query 훅입니다.
 *
 * 인증되지 않은 상태에서는 에러가 발생할 수 있으며, 에러 발생시 로그아웃을 진행합니다.
 */
export const useUserSummary = (
  options?: Omit<
    UseQueryOptions<UserSummaryResponse, Error, UserSummaryResponse>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryFn: () => fetchUserSummary({ runtime: 'client' }),
    queryKey: QUERY_KEYS.user.summary,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

/**
 * 로그아웃 처리를 위한 mutation 훅입니다.
 *
 * 서버에 로그아웃 요청을 보내고, (Next API Route)
 * 클라이언트 상태를 초기화 합니다.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.summary });
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'products' });
    },
  });
};

/**
 * 작가 프로필 수정을 위한 mutation 훅입니다.
 *
 * 서버에 formData를 body로 보내 프로필을 수정합니다.
 * 수정에 성공한 경우 작가 프로필 페이지의 프로필 정보와 유저 정보를 invalidate합니다.
 */
export const useEditArtistProfile = (artistId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editArtistProfile,
    onSuccess: () => {
      revalidateArtistTag(String(artistId));
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.summary });
    },
  });
};
