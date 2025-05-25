import { API_BASE_URL } from '@/constants';
import { createQueryParams } from '@/utils/queryParams';

import { fetchWithAuth } from './common.api';
import { ErrorResponse } from './common.type';
import { NotificationsQueryParams, NotificationsResponse } from './notifications.type';

export const fetchNotifications = async (
  queryParams: NotificationsQueryParams,
  options: { runtime: 'server' | 'client' } = { runtime: 'server' }
): Promise<NotificationsResponse> => {
  const queryString = createQueryParams(queryParams);
  const baseUrl = options.runtime === 'server' ? API_BASE_URL.SERVER : API_BASE_URL.CLIENT;

  const res = await fetchWithAuth(`${baseUrl}/api/v1/notifications/unread?${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as ErrorResponse;
  }

  return data as NotificationsResponse;
};
