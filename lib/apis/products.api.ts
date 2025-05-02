import { API_BASE_URL } from '@/constants';
import { createQueryParams } from '@/utils/queryParams';

import { ErrorResponse } from './common.type';
import { ProductsListQueryParams, ProductsListResponse } from './products.type';

const createProductsListFetcher = (baseUrl: string) => {
  return async (queryParams: ProductsListQueryParams): Promise<ProductsListResponse> => {
    const queryString = createQueryParams(queryParams);

    const res = await fetch(`${baseUrl}/api/v1/items/search?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      throw data as ErrorResponse;
    }

    return data as ProductsListResponse;
  };
};

export const fetchProductsListServerSide = createProductsListFetcher(API_BASE_URL.SERVER_SIDE);
export const fetchProductsListClientSide = createProductsListFetcher(API_BASE_URL.CLIENT_SIDE);
