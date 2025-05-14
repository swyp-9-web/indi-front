import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import {
  createProductComment,
  fetchCommentsHistory,
  fetchProductComments,
} from '../apis/comments.api';
import {
  CommentsHistoryQueryParams,
  ProductCommentsQueryParams,
  ProductCommentsResponse,
} from '../apis/comments.type';

import { QUERY_KEYS } from './queryKeys';

export const useInfiniteCommentHistory = (queryParams: CommentsHistoryQueryParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.comments.history,
    queryFn: ({ pageParam = 1 }) =>
      fetchCommentsHistory({ page: pageParam, limit: 5, ...queryParams }, { runtime: 'client' }),
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage.result;
      return meta.hasNextPage ? meta.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useProductComments = (
  productId: number,
  queryParams: ProductCommentsQueryParams,
  options?: Omit<
    UseQueryOptions<ProductCommentsResponse, Error, ProductCommentsResponse>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QUERY_KEYS.comments.product(productId, queryParams),
    queryFn: () => fetchProductComments(productId, queryParams, { runtime: 'client' }),
    ...options,
  });
};

export const useCreateProductComment = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments.history });
      queryClient.invalidateQueries({
        predicate: (query) => {
          const targetKey = QUERY_KEYS.comments.product(productId, {});
          const queryKey = query.queryKey;

          return (
            queryKey[0] === targetKey[0] &&
            queryKey[1] === targetKey[1] &&
            queryKey[2] === targetKey[2]
          );
        },
      });
    },
  });
};
