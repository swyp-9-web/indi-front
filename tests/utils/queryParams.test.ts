import { describe, expect, it } from 'vitest';

import { ProductsListQueryParams } from '@/lib/apis/products.type';
import { createQueryParams } from '@/utils/queryParams';

describe('createQueryParams', () => {
  it('should generate query string with basic parameters only', () => {
    const params: ProductsListQueryParams = {
      page: 1,
      limit: 20,
      sortType: 'CREATED_RECENT',
    };

    const result = createQueryParams(params);
    expect(result).toBe('page=1&limit=20&sortType=CREATED_RECENT');
  });

  it('should include multiple values when array parameters are provided', () => {
    const params: ProductsListQueryParams = {
      sizeTypes: ['S', 'M'],
      categoryTypes: ['CRAFTS', 'TEXTILE_ART'],
    };

    const result = createQueryParams(params);
    expect(result).toBe('sizeTypes=S&sizeTypes=M&categoryTypes=CRAFTS&categoryTypes=TEXTILE_ART');
  });

  it('should include all fields when all parameters are provided', () => {
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

  it('should omit parameters with undefined or empty values', () => {
    const params: ProductsListQueryParams = {
      page: 1,
      artistId: undefined,
      sizeTypes: undefined,
      categoryTypes: [],
    };

    const result = createQueryParams(params);
    expect(result).toBe('page=1');
  });

  it('should ignore unknown fields that are not part of the type definition', () => {
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
