import { API_BASE_URL } from '@/constants';

import { fetchWithAuth } from './common.api';
import { ErrorResponse } from './common.type';
import { FollowingPreviewResponse } from './following.type';

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
