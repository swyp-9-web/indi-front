import { createQueryParams } from '@/utils/queryParams';

import { ErrorResponse } from './common.type';
import { ProductsListQueryParams, ProductsListResponse } from './products.type';

export const fetchProductsList = async (
  queryParams: ProductsListQueryParams
): Promise<ProductsListResponse> => {
  const queryString = createQueryParams(queryParams);

  const res = await fetch(`http://211.188.54.19:8000/api/v1/items/search?${queryString}`, {
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

export const fetchClientProductsList = async (
  queryParams: ProductsListQueryParams
): Promise<ProductsListResponse> => {
  const queryString = createQueryParams(queryParams);

  const res = await fetch(`/proxy/api/v1/items/search?${queryString}`, {
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
