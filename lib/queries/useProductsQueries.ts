import { useInfiniteQuery, useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { fetchProductsList, scrapProducts, unScrapProducts } from '../apis/products.api';
import { ProductsListQueryParams, ProductsListResponse } from '../apis/products.type';

import { QUERY_KEYS } from './queryKeys';

export const useProductsQuery = (
  queryParams: ProductsListQueryParams,
  options?: Omit<
    UseQueryOptions<ProductsListResponse, Error, ProductsListResponse>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.list(queryParams),
    queryFn: () => fetchProductsList(queryParams, { runtime: 'client' }),
    ...options,
  });
};

export const useProductsInfiniteQuery = (
  queryParams: ProductsListQueryParams,
  enabled: boolean,
  initialPage = 2
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.products.list(queryParams),
    queryFn: ({ pageParam = initialPage }) =>
      fetchProductsList({ page: pageParam, limit: 20, ...queryParams }, { runtime: 'client' }),
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage.result;
      return meta.hasNextPage ? meta.currentPage + 1 : undefined;
    },
    initialPageParam: initialPage,
    enabled,
  });
};

export const useToggleProductScrap = () => {
  return useMutation({
    mutationFn: async ({ productId, isScraped }: { productId: number; isScraped: boolean }) => {
      return isScraped ? await unScrapProducts(productId) : await scrapProducts(productId);
    },
  });
};
