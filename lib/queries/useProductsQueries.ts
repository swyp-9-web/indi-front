import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchProductsList } from '../apis/products.api';
import { ProductsListQueryParams } from '../apis/products.type';

import { QUERY_KEYS } from './queryKeys';

export const useProductsInfiniteQuery = (
  queryParams: ProductsListQueryParams,
  enabled: boolean
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.products.list(queryParams),
    queryFn: ({ pageParam = 1 }) =>
      fetchProductsList({ ...queryParams, page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage.result;
      return meta.hasNextPage ? meta.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled,
  });
};
