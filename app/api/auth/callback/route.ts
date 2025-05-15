import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ErrorResponse, SuccessResponse } from '@/lib/apis/common.type';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId }: { sessionId: string } = body;

    if (!sessionId) {
      const errorResponse: ErrorResponse = {
        status: 400,
        divisionCode: 'SESSION_MISSING',
        resultMessage: '세션 ID가 전달되지 않았습니다.',
        errors: null,
        reason: 'Missing sessionId in request body',
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    const successResponse: SuccessResponse = {
      result: null,
      resultCode: 200,
      resultMessage: '쿠키 설정이 완료되었습니다.',
    };

    const response = NextResponse.json(successResponse);

    response.cookies.set('JSESSIONID', sessionId, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 2,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    const errorResponse: ErrorResponse = {
      status: 500,
      divisionCode: 'INTERNAL_SERVER_ERROR',
      resultMessage: '요청 처리 중 오류가 발생했습니다.',
      errors: null,
      reason: (error as Error).message ?? 'Unknown error',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
