import { API_BASE_URL } from '@/constants';

import { ArtistAppliesResponse, ArtistRightResponse } from './admin.type';
import { fetchWithAuth } from './common.api';
import { ErrorResponse } from './common.type';

export const fetchArtistAppliesList = async (
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<ArtistAppliesResponse> => {
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/artist-applies/admin`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as ArtistAppliesResponse;
};

export const AllowAritist = async (
  userId: number,
  artistApplyId: number,
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<ArtistRightResponse> => {
  const baseUrl = options.runtime === 'client' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/artist-applies/grant-artist-role`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, artistApplyId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as ArtistRightResponse;
};

export const DisallowAritist = async (
  userId: number,
  artistApplyId: number,
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<ArtistRightResponse> => {
  const baseUrl = options.runtime === 'client' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/artist-applies/reject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, artistApplyId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as ArtistRightResponse;
};
