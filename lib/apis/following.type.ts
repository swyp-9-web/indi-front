import { Meta, SuccessResponse } from './common.type';
import { Product } from './products.type';

export interface FollowingPreview {
  id: number;
  profileImgUrl: string;
  nickname: string;
  isFollowing: boolean;
}

export interface FollowingArtist {
  id: number;
  profileImgUrl: string;
  nickname: string;
  totalItems: number;
  totalFollower: number;
  isFollowing: boolean;
  items: Product[];
}

export interface FollowingArtistsResponse extends SuccessResponse {
  result: {
    totalFollowing: number;
    artists: FollowingArtist[];
    meta: Meta;
  };
}

export interface FollowingPreviewResponse extends SuccessResponse {
  result: {
    totalFollowings: number;
    followingArtists: FollowingPreview[];
  };
}

// 팔로잉 리스트 API 요청 시에 사용되는 쿼리 파라미터 값들에 대한 타입
export interface FollowingArtistsQueryParams {
  page?: number;
  limit?: number;
}
