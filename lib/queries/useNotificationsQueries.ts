import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchNotifications,
  readAllNotifications,
  readNotification,
} from '../apis/notifications.api';
import { NotificationsQueryParams } from '../apis/notifications.type';

import { QUERY_KEYS } from './queryKeys';

export const useInfiniteNotifications = (
  queryParams: NotificationsQueryParams,
  enabled: boolean
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.notifications.all,
    queryFn: ({ pageParam = 1 }) =>
      fetchNotifications({ page: pageParam, ...queryParams }, { runtime: 'client' }),
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage.result;
      return meta.hasNextPage ? meta.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled,
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId?: number) =>
      notificationId ? readNotification(notificationId) : readAllNotifications(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications.all }),
  });
};
