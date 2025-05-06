import { SuccessResponse } from './common.type';

export interface UserSummary {
  userId: number;
  profileImgUrl: string;
  nickname: string;
  role: 'USER' | 'ARTIST';
}

export interface ArtistDetail {
  id: number;
  profileImgUrl: string;
  nickname: string;
  aboutMe: string;
  isFollowing: boolean;
  totalItems: number;
  totalScraps: number;
  totalReactions: number;
  totalFollower: number;
  homeLink: string;
  snsLinks: string[];
}

export interface UserSummaryResponse extends SuccessResponse {
  result: UserSummary | null;
}

export interface ArtistDetailResponse extends SuccessResponse {
  result: ArtistDetail;
}
