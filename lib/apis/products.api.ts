import { createQueryParams } from '@/utils/queryParams';

import { ErrorResponse } from './common.type';
import { ProductsListQueryParams, ProductsListResponse } from './products.type';

export const fetchProductsList = async (
  queryParams: ProductsListQueryParams
): Promise<ProductsListResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('API URL이 환경변수에 정의되어 있지 않습니다.');
  }

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

export const fetchClientProductsList = async (
  queryParams: ProductsListQueryParams
): Promise<ProductsListResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('API URL이 환경변수에 정의되어 있지 않습니다.');
  }

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
