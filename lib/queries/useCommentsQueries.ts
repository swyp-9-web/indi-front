import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchCommentsHistory } from '../apis/comments.api';
import { CommentsHistoryQueryParams } from '../apis/comments.type';

import { QUERY_KEYS } from './queryKeys';

export const useInfiniteCommentHistory = (queryParams: CommentsHistoryQueryParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.comments.history(queryParams),
    queryFn: ({ pageParam = 1 }) =>
      fetchCommentsHistory({ page: pageParam, limit: 5, ...queryParams }),
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage.result;
      return meta.hasNextPage ? meta.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
