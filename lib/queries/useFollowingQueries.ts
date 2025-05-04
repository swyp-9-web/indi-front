import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { fetchFollowingPreview } from '../apis/following.api';
import { FollowingPreviewResponse } from '../apis/following.type';

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
