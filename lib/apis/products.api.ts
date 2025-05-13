import { API_BASE_URL } from '@/constants';
import { createQueryParams } from '@/utils/queryParams';

import { fetchWithAuth } from './common.api';
import { ErrorResponse, SuccessResponse } from './common.type';
import {
  DeleteProductResponse,
  ProductDetailResponse,
  ProductRegisterResponse,
  ProductsListQueryParams,
  ProductsListResponse,
} from './products.type';

export const fetchProductsList = async (
  queryParams: ProductsListQueryParams,
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<ProductsListResponse> => {
  const queryString = createQueryParams(queryParams);

  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/items/search?${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as ProductsListResponse;
};

export const fetchProductDetail = async (
  itemId: number,
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<ProductDetailResponse> => {
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/items/${itemId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) throw data as ErrorResponse;
  return data as ProductDetailResponse;
};

export const scrapProducts = async (productId: number) => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/scraps/${productId}`, {
    method: 'POST',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as SuccessResponse;
};

export const unScrapProducts = async (productId: number) => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/scraps/${productId}`, {
    method: 'DELETE',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as SuccessResponse;
};

export const registerProduct = async (formData: FormData) => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/items`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as ProductRegisterResponse;
};

export const editProduct = async (formData: FormData, productId: number) => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/items/${productId}`, {
    method: 'PATCH',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as ProductRegisterResponse;
};

export const deleteProduct = async (productId: number) => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/items/${productId}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) {
    throw data as ErrorResponse;
  }
  return data as DeleteProductResponse;
};
