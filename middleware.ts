import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;
  const userToken = cookies.get('accessToken')?.value;

  const protectedPaths = ['/mypage', '/products/scrap', '/mypage/account/delete'];
  const isProtected = protectedPaths.some((path) => nextUrl.pathname.startsWith(path));

  if (isProtected && !userToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

// 미들웨어 적용 경로 설정
export const config = {
  matcher: ['/mypage/:path*', '/products/scrap', '/mypage/account/delete'],
};
