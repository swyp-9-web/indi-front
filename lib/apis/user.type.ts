import { SuccessResponse } from './common.type';

export interface UserSummary {
  userId: number;
  profileImgUrl: string;
  nickname: string;
  role: 'USER' | 'ARTIST';
}

export interface UserSummaryResponse extends SuccessResponse {
  result: UserSummary | null;
}
