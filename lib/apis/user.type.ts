import { SuccessResponse } from './common.type';

export interface UserSummary {
  id: number;
  nickname: string;
  profileImgUrl: string;
  email: string;
  role: 'USER' | 'ARTIST';
  telNumber: string;
  createdAt: string;
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
