import { ProductsListQueryParams } from '@/lib/apis/products.type';
import { stableStringify } from '@/utils/object';

export const QUERY_KEYS = {
  products: {
    all: ['products'],
    list: (queryParams: ProductsListQueryParams) => ['products', stableStringify(queryParams)],
  },
  user: {
    summary: ['user', 'summary'],
  },
};
