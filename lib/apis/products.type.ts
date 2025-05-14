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

export interface ProductDetail {
  itemId: number;
  title: string;
  description: string;
  imgUrls: string[];
  price: number;
  size: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
  categoryType: string;
  totalScrapCount: number;
  viewer: {
    isScrapped: boolean;
    isFollowing: boolean;
    isOwner: boolean;
  };
  artist: {
    id: number;
    profileImgUrl: string;
    nickname: string;
    description: string;
  };
  reaction: {
    totalCount: number;
    likes: number;
    wants: number;
    revisits: number;
    isLiked: boolean;
    isWanted: boolean;
    isRevisited: boolean;
    likedEmojiId: number;
    wantedEmojiId: number;
    revisitedEmojiId: number;
  };
}

export interface ProductDetailResponse extends SuccessResponse {
  result: ProductDetail;
}

export interface ProductsListResponse extends SuccessResponse {
  result: {
    items: Product[];
    meta: Meta;
    conditions: SearchConditions;
  };
}

export interface ProductRegisterResponse extends SuccessResponse {
  result: {
    itemId: number;
  };
}

export interface DeleteProductResponse extends SuccessResponse {
  result: {
    itemId: number;
  };
}

// 상품 리스트 API 요청 시에 사용되는 쿼리 파라미터 값들에 대한 타입
export interface ProductsListQueryParams {
  page?: number;
  limit?: number;
  artistId?: number;
  sortType?: string;
  sizeTypes?: string[] | string;
  categoryTypes?: string[] | string;
  keyword?: string;
}
