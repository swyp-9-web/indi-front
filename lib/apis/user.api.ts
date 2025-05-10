import { API_BASE_URL } from '@/constants';

import { fetchWithAuth } from './common.api';
import { ErrorResponse } from './common.type';
import { ArtistDetailResponse, UserSummaryResponse } from './user.type';

export const setUserCookie = async (sessionId: string): Promise<void> => {
  const res = await fetch('/api/auth/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }
};

export const fetchUserSummary = async (
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<UserSummaryResponse> => {
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/users/me`);

  const data = await res.json();

  if (!res.ok) {
    return {
      result: null,
      resultCode: data.status,
      resultMessage: data.resultMessage,
    };
  }

  return data as UserSummaryResponse;
};

export const logoutUser = async () => {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }
};

export const fetchArtistDetail = async (
  artistId: number,
  options: { runtime?: 'server' | 'client'; onError?: (error: ErrorResponse) => void }
): Promise<ArtistDetailResponse> => {
  const mergedOptions = { runtime: 'server', ...options };

  const baseUrl = mergedOptions.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/users/artists/${artistId}`, {
    next: { tags: [`artist-${artistId}`] },
  });

  const data = await res.json();

  if (!res.ok) {
    if (mergedOptions.onError) {
      mergedOptions.onError(data as ErrorResponse);
    } else {
      throw data as ErrorResponse;
    }
  }

  return data as ArtistDetailResponse;
};

export const editArtistProfile = async (formData: FormData) => {
  const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/users/artist/profile`, {
    method: 'PATCH',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as ArtistDetailResponse;
};
