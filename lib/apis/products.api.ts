import { API_BASE_URL } from '@/constants';
import { createQueryParams } from '@/utils/queryParams';

import { ErrorResponse } from './common.type';
import { ProductsListQueryParams, ProductsListResponse } from './products.type';

export const fetchProductsList = async (
  queryParams: ProductsListQueryParams,
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<ProductsListResponse> => {
  const queryString = createQueryParams(queryParams);

  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

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
