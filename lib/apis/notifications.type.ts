import { SuccessResponse } from './common.type';

interface BaseNotification {
  id: number;
  type: 'COMMENT' | 'ARTIST_APPROVED';
  content: string;
  read: boolean;
  createdAt: string; // ISO string
}

interface CommentNotification extends BaseNotification {
  type: 'COMMENT';
  data: {
    itemId: number;
    senderNickname: string;
    commentId: number;
    itemTitle: string;
    createdAt: string; // e.g. 2025-05-24 05:53:12
  };
}

interface ArtistApprovedNotification extends BaseNotification {
  type: 'ARTIST_APPROVED';
  data: {
    createdAt: string;
  };
}

export type Notification = CommentNotification | ArtistApprovedNotification;

export interface NotificationsResponse extends SuccessResponse {
  result: {
    notifications: Notification[];
    meta: {
      // 해당 response만 totalItems => totalNotifications로 변경되어 common.type.ts의 Meta 사용하지 않고 재정의
      currentPage: number;
      pageSize: number;
      totalNotifications: number;
      hasNextPage: boolean;
    };
  };
}

export interface ReadNotificationResponse extends SuccessResponse {
  result: string;
}

// 알림 리스트 API 요청 시에 사용되는 쿼리 파라미터 값들에 대한 타입
export interface NotificationsQueryParams {
  page?: number;
  size?: number; // 다른 response의 경우 "limit"를 사용하지만 해당 response만 size 사용
}
