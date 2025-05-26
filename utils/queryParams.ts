import { FollowingArtistsQueryParams } from '@/lib/apis/following.type';
import { NotificationsQueryParams } from '@/lib/apis/notifications.type';
import { ProductsListQueryParams } from '@/lib/apis/products.type';

/**
 * 상품 목록 API 호출을 위한 쿼리 문자열(query string)을 생성합니다.
 *
 * page, limit, sortType, keyword 등의 기본 필터 외에도
 * artistId, sizeTypes, categoryTypes 등의 배열 또는 단일 값을 포함한
 * 다양한 필터 조건을 URLSearchParams 형식으로 변환합니다.
 *
 * @param params - 상품 목록 조회에 필요한 필터 조건 객체
 * @returns URL에 사용할 수 있는 쿼리 문자열 (예: page=1&limit=20&sizeTypes=SMALL&sizeTypes=LARGE)
 */
export const createQueryParams = (
  params: ProductsListQueryParams | FollowingArtistsQueryParams | NotificationsQueryParams
): string => {
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
  if ('limit' in params && params.limit) sp.set('limit', params.limit.toString());
  if ('size' in params && params.size) sp.set('size', params.size.toString());

  if ('sortType' in params && params.sortType) sp.set('sortType', params.sortType);
  if ('keyword' in params && params.keyword) sp.set('keyword', params.keyword);
  if ('artistId' in params && params.artistId) sp.set('artistId', params.artistId?.toString());

  if ('sizeTypes' in params) appendParam(sp, 'sizeTypes', params.sizeTypes);
  if ('categoryTypes' in params) appendParam(sp, 'categoryTypes', params.categoryTypes);

  return sp.toString();
};
