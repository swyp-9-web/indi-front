import { Meta, SuccessResponse } from './common.type';

interface SearchConditions {
  search: null | string;
  filters: {
    size: null | string[];
    category: null | string[];
  };
  sortType: string;
  login: boolean;
  scrapedPage: boolean;
  artistPage: boolean;
}

export interface Product {
  price: number;
  totalScraped: number;
  createdAt: string;
  updatedAt: string;
  id: number;
  thumbnailImgUrl: string;
  name: string;
  category: string;
  size: string;
  artist: {
    id: number;
    nickname: string;
  };
  scrap:
    | {
        isScrapped: false;
        scrapedAt: null;
      }
    | {
        isScrapped: boolean;
        scrapedAt: string;
      };
  totalReaction: {
    likes: number;
    wants: number;
    revisits: number;
  };
}

export interface ProductsListResponse extends SuccessResponse {
  result: {
    items: Product[];
    meta: Meta;
    conditions: SearchConditions;
  };
}
