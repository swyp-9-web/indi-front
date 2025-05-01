import { ProductsListQueryParams } from '@/lib/apis/products.type';

export const createQueryParams = (params: ProductsListQueryParams): string => {
  const sp = new URLSearchParams();

  const appendParam = (sp: URLSearchParams, key: string, value?: string | string[]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((v) => sp.append(key, v));
    } else {
      sp.append(key, value);
    }
  };

  if (params.page) sp.set('page', params.page.toString());
  if (params.limit) sp.set('limit', params.limit.toString());
  if (params.sortType) sp.set('sortType', params.sortType);
  if (params.keyword) sp.set('keyword', params.keyword);

  appendParam(sp, 'artistId', params.artistId?.toString());
  appendParam(sp, 'sizeTypes', params.sizeTypes);
  appendParam(sp, 'categoryTypes', params.categoryTypes);

  return sp.toString();
};
