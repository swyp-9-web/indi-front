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
