import { Meta, SuccessResponse } from './common.type';

export interface ArtistApplies {
  id: number;
  email: string;
  snsLink: string;
  artistAboutMe: string;
  status: string;
  rejectedCount: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    nickname: string;
  };
}

export interface ArtistAppliesMeta {
  currentPage: number;
  pageSize: number;
  totalApplies: number;
  hasNextPage: boolean;
}

export interface ArtistRight {
  userId: number;
  artistApplyId: number;
}

export interface ArtistAppliesResponse extends SuccessResponse {
  result: { applies: ArtistApplies[]; meta: ArtistAppliesMeta };
}
export interface ArtistRightResponse extends SuccessResponse {
  result: string;
}
