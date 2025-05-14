import { Meta, SuccessResponse } from './common.type';

interface Product {
  id: number;
  title: string;
  price: number;
  artist: {
    id: number;
    nickname: string;
  };
  thumbnailImgUrl: string;
}

interface CommentHistory {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    nickname: string;
    profileImgUrl: string;
  };
}

export interface CommentHistoryGroup {
  item: Product;
  myComment: CommentHistory;
  replyComment: CommentHistory | null;
}

export interface CommentsHistoryResponse extends SuccessResponse {
  result: {
    comments: CommentHistoryGroup[];
    meta: Meta;
  };
}

// 댓글 히스토리 API 요청 시에 사용되는 쿼리 파라미터 값들에 대한 타입
export interface CommentsHistoryQueryParams {
  page?: number;
  limit?: number;
}
