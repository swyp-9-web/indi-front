import { ProductsListQueryParams } from '@/lib/apis/products.type';
import { stableStringify } from '@/utils/object';

import { CommentsHistoryQueryParams } from '../apis/comments.type';
import { FollowingArtistsQueryParams } from '../apis/following.type';

export const QUERY_KEYS = {
  products: {
    list: (queryParams: ProductsListQueryParams) => ['products', stableStringify(queryParams)],
  },
  following: {
    preview: ['following', 'preview'],
    artists: (queryParams: FollowingArtistsQueryParams) => [
      'following',
      'artists',
      stableStringify(queryParams),
    ],
  },
  user: {
    summary: ['user', 'summary'],
  },
  comments: {
    history: (queryParams: CommentsHistoryQueryParams) => [
      'comments',
      'history',
      stableStringify(queryParams),
    ],
  },
};
