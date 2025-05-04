import { FollowingPreviewResponse } from '../apis/following.type';

export const followingPreviewMock: FollowingPreviewResponse = {
  result: {
    totalFollowings: 1032,
    followingArtists: [
      {
        id: 23123123,
        profileImgUrl:
          'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
        nickname: '신나는 작가',
      },
      {
        id: 123123123,
        profileImgUrl:
          'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
        nickname: '즐거운 작가',
      },
      {
        id: 2132323322,
        profileImgUrl:
          'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
        nickname: '공중제비 도는 작가',
      },
      {
        id: 6213123123,
        profileImgUrl:
          'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
        nickname: '안녕하세요 작가',
      },
    ],
  },
  resultCode: 200,
  resultMessage: '성공',
};
