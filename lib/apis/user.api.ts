import { API_BASE_URL } from '@/constants';

import { ErrorResponse } from './common.type';
import { UserSummaryResponse } from './user.type';

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
  options: {
    runtime: 'server' | 'client';
  } = { runtime: 'server' }
): Promise<UserSummaryResponse> => {
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetch(`${baseUrl}/api/v1/users/me`, {
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
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
