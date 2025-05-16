import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import {
  editProduct,
  fetchProductsList,
  registerProduct,
  scrapProducts,
  unScrapProducts,
} from '../apis/products.api';
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

/**
 * 작품 등록을 위한 mutation 훅입니다.
 *
 * 서버에 formData를 body로 보내 작품을 등록합니다.
 * 작품 등록에 성공한 경우 작품 정보를 invalidate 합니다.
 */
export const useRegisterProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEYS.products.all[0],
      });
    },
  });
};

/**
 * 작품 수정을 위한 mutation 훅입니다.
 *
 * 서버에 formData를 body로 보내 작품을 수정합니다.
 * 작품 등록에 성공한 경우 작품 정보를 invalidate 합니다.
 */
export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, productId }: { formData: FormData; productId: number }) =>
      editProduct(formData, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEYS.products.all[0],
      });
    },
  });
};
