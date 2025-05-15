import { API_BASE_URL } from '@/constants';
import { createQueryParams } from '@/utils/queryParams';

import {
  CommentCreateResponse,
  CommentDeleteResponse,
  CommentEditResponse,
  CommentsHistoryQueryParams,
  CommentsHistoryResponse,
  ProductCommentsQueryParams,
  ProductCommentsResponse,
} from './comments.type';
import { fetchWithAuth } from './common.api';
import { ErrorResponse } from './common.type';

export const fetchCommentsHistory = async (
  queryParams: CommentsHistoryQueryParams,
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<CommentsHistoryResponse> => {
  const queryString = createQueryParams(queryParams);
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/comments/my-activities?${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as CommentsHistoryResponse;
};

export const fetchProductComments = async (
  productId: number,
  queryParams: ProductCommentsQueryParams,
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<ProductCommentsResponse> => {
  const queryString = createQueryParams(queryParams);
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/comments/item/${productId}?${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as ProductCommentsResponse;
};

export const createProductComment = async (commentData: {
  productId: number;
  content: string;
  secret: boolean;
  rootCommentId: number | null;
}) => {
  const { productId: itemId, content: comment, secret, rootCommentId } = commentData;

  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemId,
      comment,
      secret,
      rootCommentId,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as CommentCreateResponse;
};

export const editProductComment = async (commentData: {
  commentId: number;
  content: string;
  secret: boolean;
}) => {
  const { commentId, content: comment, secret } = commentData;

  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/comments/${commentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      comment,
      secret,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as CommentEditResponse;
};

export const deleteProductComment = async (commentId: number) => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/comments/${commentId}`, {
    method: 'DELETE',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as CommentDeleteResponse;
};
