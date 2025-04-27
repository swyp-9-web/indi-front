/**
 * 앱 내 모든 라우트 경로를 관리하는 상수 객체입니다.
 */
export const ROUTE_PATHS = {
  HOME: '/',

  // 마이페이지
  MYPAGE: '/mypage',
  MY_FOLLOWING: '/mypage/following',
  MY_SCRAPPED: '/mypage/products/scrap',
  DELETE_ACCOUNT: '/mypage/account/delete',

  // 로그인/회원가입 관련 (임시)
  // ARTIST_INVITE의 경우 로직에 따라 동적 라우팅이 아니라 쿼리를 이용해서 할 수도 있음
  LOGIN: '/login',
  REGISTER: '/register',
  ARTIST_INVITE: (id: string) => `/invite/${id}`,

  // 상품 관련 페이지
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  REGISTER_PRODUCT: '/artists/products/register',

  // 크리에이터 페이지
  ARTIST: (id: string) => `/artists/${id}`,
};
