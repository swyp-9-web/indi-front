import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ROUTE_PATHS } from './constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('JSESSIONID')?.value;

  // 정확히 일치해야 하는 보호 경로
  const PROTECTED_PATHS = [ROUTE_PATHS.REGISTER_PRODUCT, ROUTE_PATHS.MYPAGE];

  // 하위 경로까지 포함해서 보호해야 하는 prefix 경로
  const PROTECTED_PREFIXES = [ROUTE_PATHS.MYPAGE];

  const isProtected =
    PROTECTED_PATHS.includes(pathname) ||
    PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(`${prefix}/`));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(ROUTE_PATHS.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
