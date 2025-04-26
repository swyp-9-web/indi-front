// 상품 리스트, 목록의 상품 카드
export const productListMock = {
  products: [
    {
      id: '1234567',
      imageUrl:
        'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
      name: '작품명',
      price: 8000,
      category: 'VISUAL_ART',
      size: 'M',
      artist: {
        id: '1258292',
        nickname: '신기한 작가',
      },
      isScraped: false,
    },
    {
      id: '1234568',
      imageUrl:
        'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
      name: '작품명',
      price: 23000,
      category: 'VISUAL_ART',
      size: 'L',
      artist: {
        id: '1258293',
        nickname: '작가 닉네임',
      },
      isScraped: false,
    },
    {
      id: '1234521',
      imageUrl:
        'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
      name: '작품명',
      price: 9000,
      category: 'VISUAL_ART',
      size: 'S',
      artist: {
        id: '1258292',
        nickname: '신나는 작가',
      },
      isScraped: false,
    },
    {
      id: '1234349',
      imageUrl:
        'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
      name: '작품명',
      price: 15000,
      category: 'VISUAL_ART',
      size: 'L',
      artist: {
        id: '1258292',
        nickname: '신나는 작가',
      },
      isScraped: false,
    },
    {
      id: '1223349',
      imageUrl:
        'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
      name: null,
      price: 15000,
      category: 'VISUAL_ART',
      size: 'X',
      artist: {
        id: '1258292',
        nickname: '신나는 작가',
      },
      isScraped: false,
    },
    {
      id: '1223322',
      imageUrl:
        'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
      name: '작품명',
      price: null,
      category: 'VISUAL_ART',
      size: 'L',
      artist: {
        id: '1258292',
        nickname: '신나는 작가',
      },
      isScraped: false,
    },
    {
      id: '1299729',
      imageUrl:
        'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
      name: '작품명',
      price: 15000,
      category: 'VISUAL_ART',
      size: 'L',
      artist: {
        id: '1258292',
        nickname: '신나는 작가',
      },
      isScraped: false,
    },
    {
      id: '2123229',
      imageUrl:
        'https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8',
      name: '작품명',
      price: 15000,
      category: 'VISUAL_ART',
      size: 'L',
      artist: {
        id: '1258292',
        nickname: '신나는 작가',
      },
      isScraped: false,
    },
  ],

  meta: {
    currentPage: 1,
    pageSize: 8,
    totalCount: 23,
    hasNextPage: true,
  },

  condition: {
    query: null,
    filter: {
      size: null,
      category: ['VISUAL_ART', 'TEXTILE_ART'],
    },
    sort: 'recent',
  },
};
