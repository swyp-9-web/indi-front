import { ProductsListQueryParams } from '@/lib/apis/products.type';
import { stableStringify } from '@/utils/object';

export const QUERY_KEYS = {
  products: {
    list: (queryParams: ProductsListQueryParams) => ['products', stableStringify(queryParams)],
  },
  following: {
    preview: ['following', 'preview'],
  },
  user: {
    summary: ['user', 'summary'],
  },
};
