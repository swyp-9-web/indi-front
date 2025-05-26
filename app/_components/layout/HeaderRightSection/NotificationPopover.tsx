'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ROUTE_PATHS } from '@/constants';
import { useNotificationSSE } from '@/hooks/useNotificationSSE';
import { Notification } from '@/lib/apis/notifications.type';
import { UserSummary } from '@/lib/apis/user.type';
import { NotificationIcon, NotificationUnreadIcon } from '@/lib/icons';
import {
  useInfiniteNotifications,
  useReadNotification,
} from '@/lib/queries/useNotificationsQueries';
import toast from '@/lib/toast';
import { formatOverThousand } from '@/utils/formatNumber';

interface NotificationPopoverProps {
  user: UserSummary | null;
}

export default function NotificationPopover({ user }: NotificationPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { hasIncomingNotification, clearIncomingNotification } = useNotificationSSE(user);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteNotifications({ size: 10 }, Boolean(user));

  useEffect(() => {
    if (!hasIncomingNotification) return;

    refetch();
    clearIncomingNotification();
  }, [hasIncomingNotification, refetch, clearIncomingNotification]);

  const notifications = data?.pages.flatMap((page) => page.result.notifications) ?? [];
  const totalUnread = data?.pages[0].result.meta.totalNotifications ?? 0;

  // callback ref를 이용한 infinite scroll ref 설정
  const handleObserverTarget = (node: HTMLDivElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  };

  const { mutate: readNotification } = useReadNotification();
  const router = useRouter();

  const handleNotificationClick = (notification: Notification) => {
    readNotification(notification.id, {
      onSuccess: () => {
        if (notification.type === 'COMMENT') {
          router.push(ROUTE_PATHS.PRODUCT_DETAIL(String(notification.data.itemId)));
          setIsOpen(false);
        }
      },
      onError: () => {
        toast.error('잠시 후에 시도해주세요');
      },
    });
  };

  const handleReadAllClick = () => {
    readNotification(undefined, {
      onError: () => {
        toast.error('잠시 후에 시도해주세요');
      },
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <PopoverTrigger className="flex h-9.5 w-9.5 cursor-pointer items-center justify-center">
        {totalUnread > 0 || hasIncomingNotification ? (
          <NotificationUnreadIcon className="h-6 w-6" />
        ) : (
          <NotificationIcon className="h-6 w-6" />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={4}
        alignOffset={-10}
        className="bg-custom-background border-custom-gray-100 z-10 w-80 rounded-none border p-0 shadow-none"
      >
        <div className="flex h-11.5 w-full items-center justify-between border-b px-5">
          <h3 className="text-custom-brand-primary text-sm font-medium">{`읽지 않은 알림 (${formatOverThousand(totalUnread)})`}</h3>
          <button
            onClick={handleReadAllClick}
            className="text-custom-brand-primary cursor-pointer text-xs font-semibold underline underline-offset-2"
          >
            모두 읽음
          </button>
        </div>

        {totalUnread > 0 ? (
          <div className="max-h-80.5 overflow-y-auto">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="text-custom-gray-400 h-11.5 cursor-pointer truncate px-5 py-3 text-sm underline-offset-2 hover:underline"
              >
                {notification.type === 'COMMENT' &&
                  `${notification.data.senderNickname}님이 ${notification.data.itemTitle}에 댓글을 달았습니다`}
                {notification.type === 'ARTIST_APPROVED' && '축하합니다! 작가로 선정되셨습니다!'}
              </button>
            ))}

            {hasNextPage && !isFetchingNextPage && (
              <div ref={handleObserverTarget} className="h-11.5 w-full" />
            )}

            {isFetchingNextPage && (
              <div className="flex h-11.5 w-full items-center justify-center py-3">
                <div className="border-custom-gray-200 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              </div>
            )}
          </div>
        ) : (
          <div className="text-custom-gray-200 flex h-35 w-full items-center justify-center text-xs">
            새로운 알림이 없습니다
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
