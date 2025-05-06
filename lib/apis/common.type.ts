export interface SuccessResponse {
  result: any;
  resultCode: number;
  resultMessage: string;
}

export interface ErrorResponse {
  status: number;
  divisionCode: string;
  resultMessage: string;
  errors: null;
  reason: string;
}

// 페이지 관련 메타 정보
export interface Meta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
}

// 서버에서 사용되는 enum 값
export type SortOption =
  | 'CREATED_RECENT'
  | 'CREATED_OLDEST'
  | 'REACTED_TOP'
  | 'SCRAPED_TOP'
  | 'SCRAPED_RECENT'
  | 'SCRAP_ITEM_RECENT';

export type ProductCategory =
  | 'TEXTILE_ART'
  | 'VISUAL_ART'
  | 'SCULPTURE_ART'
  | 'CRAFTS'
  | 'PAPER_BOOK_ART'
  | 'FURNITURE_INTERIOR'
  | 'NATURE_LIFE_CRAFT'
  | 'FASHION_CLOTHING';

export type ProductSize = 'L' | 'M' | 'S' | 'X';
