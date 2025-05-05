import { useInfiniteQuery, useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

import {
  fetchFollowingArtists,
  fetchFollowingPreview,
  followArtist,
  unfollowArtist,
} from '../apis/following.api';
import {
  FollowingArtistsQueryParams,
  FollowingArtistsResponse,
  FollowingPreviewResponse,
} from '../apis/following.type';

import { QUERY_KEYS } from './queryKeys';

export const useFollowingPreview = (
  options?: Omit<
    UseQueryOptions<FollowingPreviewResponse, Error, FollowingPreviewResponse>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QUERY_KEYS.following.preview,
    queryFn: () => fetchFollowingPreview({ runtime: 'client' }),
    ...options,
  });
};

export const useToggleFollow = () => {
  return useMutation({
    mutationFn: async ({ artistId, isFollowing }: { artistId: number; isFollowing: boolean }) => {
      return isFollowing ? await unfollowArtist(artistId) : await followArtist(artistId);
    },
  });
};

export const useFollowingArtists = (
  queryParams: FollowingArtistsQueryParams,
  options?: Omit<
    UseQueryOptions<FollowingArtistsResponse, Error, FollowingArtistsResponse>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QUERY_KEYS.following.artists(queryParams),
    queryFn: () =>
      fetchFollowingArtists({ page: 1, limit: 5, ...queryParams }, { runtime: 'client' }),
    ...options,
  });
};

export const useInfiniteFollowingArtists = (
  queryParams: FollowingArtistsQueryParams,
  enabled: boolean
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.following.artists(queryParams),
    queryFn: ({ pageParam = 2 }) =>
      fetchFollowingArtists({ page: pageParam, ...queryParams }, { runtime: 'client' }),
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage.result;
      return meta.hasNextPage ? meta.currentPage + 1 : undefined;
    },
    initialPageParam: 2,
    enabled,
  });
};
