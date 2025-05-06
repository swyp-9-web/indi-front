import { API_BASE_URL } from '@/constants';
import { createQueryParams } from '@/utils/queryParams';

import { fetchWithAuth } from './common.api';
import { ErrorResponse, SuccessResponse } from './common.type';
import {
  FollowingArtistsQueryParams,
  FollowingArtistsResponse,
  FollowingPreviewResponse,
} from './following.type';

export const fetchFollowingPreview = async (
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<FollowingPreviewResponse> => {
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/follows/preview`);

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as FollowingPreviewResponse;
};

export const unfollowArtist = async (artistId: number) => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/follows/${artistId}`, {
    method: 'DELETE',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as SuccessResponse;
};

export const followArtist = async (artistId: number) => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/follows/${artistId}`, {
    method: 'POST',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as SuccessResponse;
};

export const fetchFollowingArtists = async (
  queryParams: FollowingArtistsQueryParams,
  options: { runtime: 'server' | 'client' }
): Promise<FollowingArtistsResponse> => {
  const queryString = createQueryParams(queryParams);
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/follows/artists?${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as FollowingArtistsResponse;
};
