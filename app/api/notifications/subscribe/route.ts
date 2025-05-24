import { NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from '@/constants';
import { fetchWithAuth } from '@/lib/apis/common.api';
import { ErrorResponse } from '@/lib/apis/common.type';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  // 백엔드에 SSE 구독 요청
  const backendResponse = await fetchWithAuth(
    `${API_BASE_URL.SERVER}/api/v1/notifications/subscribe`,
    { method: 'GET' }
  );

  // SSE 스트림이 없을 경우 에러 반환
  if (!backendResponse.body) {
    const errorResponse: ErrorResponse = {
      status: 500,
      divisionCode: 'SSE_CONNECTION_FAILED',
      resultMessage: 'SSE 스트림 수신 실패',
      errors: null,
      reason: '백엔드에서 유효한 SSE 스트림을 받지 못했습니다.',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }

  // 스트림 생성: 클라이언트로 이벤트 전달
  const stream = new ReadableStream({
    async start(controller) {
      const reader = backendResponse.body!.getReader();

      // 클라이언트가 연결 종료 시 처리
      const abortHandler = () => {
        reader.cancel();
        controller.close();
      };

      req.signal.addEventListener('abort', abortHandler);

      try {
        // 백엔드 스트림 데이터를 반복적으로 읽고 클라이언트에 전송
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }

        // 스트림 정상 종료 시 리더 해제
        await reader.cancel();
      } catch (error) {
        // 오류 발생 시 SSE 형식으로 에러 이벤트 전송
        const errorResponse: ErrorResponse = {
          status: 500,
          divisionCode: 'SSE_STREAM_ERROR',
          resultMessage: 'SSE 스트림 처리 중 오류가 발생했습니다.',
          errors: null,
          reason: (error as Error).message ?? 'Unknown error',
        };

        controller.enqueue(
          new TextEncoder().encode(`event: error\ndata: ${JSON.stringify(errorResponse)}\n\n`)
        );
      } finally {
        // 리소스 정리
        controller.close();
        req.signal.removeEventListener('abort', abortHandler);
      }
    },
  });

  // SSE 응답 반환
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
