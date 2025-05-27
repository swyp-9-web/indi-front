import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTE_PATHS } from '@/constants';
import { UserSummary } from '@/lib/apis/user.type';
import { useReadNotification } from '@/lib/queries/useNotificationsQueries';
import { useUserSummary } from '@/lib/queries/useUserQueries';
import toast from '@/lib/toast';
import { useArtistWelcomeDialog } from '@/stores/useArtistWelcomeDialog';

// ⚠️ 주의: Notification 타입은 SSE에서 오는 데이터 전용 타입이므로,
//         일반 알림 API 응답과 구조가 다르므로 별도로 정의

interface Notification {
  id: number;
  type: string;
  content: string;
  read: boolean;
  createdAt: string;
}

interface CommentNotification extends Notification {
  type: 'COMMENT';
  data: {
    itemTitle: string;
    senderNickname: string;
    itemId: number;
    createdAt: string;
    commentId: number;
  };
}

interface ArtistApprovedNotification extends Notification {
  type: 'ARTIST_APPROVED';
  data: {
    createdAt: string;
  };
}

type NotificationPayload = CommentNotification | ArtistApprovedNotification;

export const useNotificationSSE = (user: UserSummary | null) => {
  const [hasIncomingNotification, setHasIncomingNotification] = useState(false);
  const [latestNotification, setLatestNotification] = useState<NotificationPayload | null>(null);

  const { toggleIsOpen, setOnClickGoBackButton } = useArtistWelcomeDialog();
  const router = useRouter();
  const { mutate: readNotification } = useReadNotification();
  const { data: userData } = useUserSummary();

  const handleArtistWelcomeNotification = useCallback(
    (data: NotificationPayload) => {
      const onClickGoBackButton = () =>
        readNotification(data.id, {
          onSuccess: () => {
            toggleIsOpen();
            router.push(ROUTE_PATHS.ARTIST(String(userData?.result?.id)));
          },
          onError: () => {
            toast.error('잠시 후에 다시 시도해주세요');
          },
        });

      setOnClickGoBackButton(onClickGoBackButton);
      toggleIsOpen();
    },
    [readNotification, router, toggleIsOpen, setOnClickGoBackButton, userData]
  );

  useEffect(() => {
    if (!user) return;

    const eventSource = new EventSource('/api/notifications/subscribe');

    const handleNotification = (event: MessageEvent) => {
      try {
        const data: NotificationPayload = JSON.parse(event.data);
        console.log('새 알림 수신:', data);

        setLatestNotification(data);
        setHasIncomingNotification(true);

        if (data.type === 'ARTIST_APPROVED') {
          handleArtistWelcomeNotification(data);
        }
      } catch (error) {
        console.error('알림 파싱 실패:', error);
      }
    };

    // eventSource.addEventListener('connect', () => {
    //   console.log('SSE 연결됨');
    // });

    eventSource.addEventListener('new-notification', handleNotification);

    // 에러 발생시에 서버로부터 다음과 같은 오류가 발생 (Next API Route)
    // {"status":500,"divisionCode":"SSE_STREAM_ERROR","resultMessage":"SSE 스트림 처리 중 오류가 발생했습니다.","errors":null,"reason":"terminated"}
    eventSource.onerror = () => {
      eventSource.removeEventListener('new-notification', handleNotification);
      eventSource.close();
    };

    return () => {
      eventSource.removeEventListener('new-notification', handleNotification);
      eventSource.close();
    };
  }, [user, handleArtistWelcomeNotification]);

  return {
    hasIncomingNotification,
    latestNotification,
    clearIncomingNotification: () => {
      setHasIncomingNotification(false);
      setLatestNotification(null);
    },
  };
};
