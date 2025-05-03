import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ErrorResponse, SuccessResponse } from '@/lib/apis/common.type';

export async function POST(_request: NextRequest) {
  try {
    const successResponse: SuccessResponse = {
      result: null,
      resultCode: 200,
      resultMessage: '로그아웃이 완료되었습니다.',
    };

    const response = NextResponse.json(successResponse);

    response.cookies.set('JSESSIONID', '', {
      path: '/',
      httpOnly: true,
      maxAge: 0, // 만료
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    const errorResponse: ErrorResponse = {
      status: 500,
      divisionCode: 'INTERNAL_SERVER_ERROR',
      resultMessage: '로그아웃 처리 중 오류가 발생했습니다.',
      errors: null,
      reason: (error as Error).message ?? 'Unknown error',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
