import { describe, expect, it } from 'vitest';

import { ProductsListQueryParams } from '@/lib/apis/products.type';
import { createQueryParams } from '@/utils/queryParams';

describe('createQueryParams 테스트', () => {
  it('기본 파라미터만 포함된 경우', () => {
    const params: ProductsListQueryParams = {
      page: 1,
      limit: 20,
      sortType: 'CREATED_RECENT',
    };

    const result = createQueryParams(params);
    expect(result).toBe('page=1&limit=20&sortType=CREATED_RECENT');
  });

  it('배열 파라미터 포함된 경우', () => {
    const params: ProductsListQueryParams = {
      sizeTypes: ['S', 'M'],
      categoryTypes: ['CRAFTS', 'TEXTILE_ART'],
    };

    const result = createQueryParams(params);
    expect(result).toBe('sizeTypes=S&sizeTypes=M&categoryTypes=CRAFTS&categoryTypes=TEXTILE_ART');
  });

  it('모든 파라미터가 포함된 경우', () => {
    const params: ProductsListQueryParams = {
      page: 2,
      limit: 10,
      sortType: 'SCRAPED_TOP',
      keyword: '그림',
      artistId: 12345,
      sizeTypes: 'L',
      categoryTypes: 'FURNITURE_INTERIOR',
    };

    const result = createQueryParams(params);
    expect(result).toBe(
      'page=2&limit=10&sortType=SCRAPED_TOP&keyword=%EA%B7%B8%EB%A6%BC&artistId=12345&sizeTypes=L&categoryTypes=FURNITURE_INTERIOR'
    );
  });

  it('undefined 값이 있는 경우 무시됨', () => {
    const params: ProductsListQueryParams = {
      page: 1,
      artistId: undefined,
      sizeTypes: undefined,
      categoryTypes: [],
    };

    const result = createQueryParams(params);
    expect(result).toBe('page=1');
  });

  it('정의되지 않은 필드(test 등)는 무시된다', () => {
    const params = {
      page: 1,
      limit: 10,
      test: 123,
    };

    const result = createQueryParams(params);

    expect(result).toBe('page=1&limit=10');
    expect(result.includes('test')).toBe(false);
  });
});
