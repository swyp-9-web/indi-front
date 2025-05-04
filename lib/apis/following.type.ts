import { SuccessResponse } from './common.type';

export interface FollowingPreview {
  id: number;
  profileImgUrl: string;
  nickname: string;
}

export interface FollowingPreviewResponse extends SuccessResponse {
  result: {
    totalFollowings: number;
    followingArtists: FollowingPreview[];
  };
}
