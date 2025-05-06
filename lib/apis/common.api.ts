/**
 * 인증 쿠키(JSESSIONID)를 자동으로 포함하여 fetch 요청을 수행하는 함수입니다.
 *
 * 이 함수는 서버와 클라이언트 런타임을 자동으로 구분하여 각각에 맞는 방식으로 쿠키를 처리합니다.
 *
 * - 서버 환경(Node.js, 서버 컴포넌트, API Route 등)에서는 `next/headers`의 `cookies()`를 통해
 *   JSESSIONID 값을 추출한 후, 해당 쿠키를 `Cookie` 헤더에 직접 주입합니다.
 *
 * - 클라이언트 환경(브라우저)에서는 자동으로 `credentials: 'include'`를 추가하여
 *   요청 시 브라우저의 쿠키가 함께 전송되도록 처리합니다.
 *
 * @param input 요청할 URL 또는 Request 객체
 * @param init fetch 옵션 객체 (method, headers 등)
 * @returns fetch 응답 객체 (Response)
 *
 * @example
 * // 서버 환경에서 사용 예시
 * const res = await fetchWithAuth(`${API_BASE_URL.SERVER}/api/v1/users/me`);
 *
 * // 클라이언트 환경에서 사용 예시
 * const res = await fetchWithAuth(`${API_BASE_URL.CLIENT}/api/v1/users/me`);
 */
export const fetchWithAuth = async (
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> => {
  const isServer = typeof window === 'undefined';

  const headers = new Headers(init.headers);

  if (isServer) {
    const { cookies } = await import('next/headers');

    const cookieStore = await cookies();
    const session = cookieStore.get('JSESSIONID')?.value;

    if (session) {
      headers.set('Cookie', `JSESSIONID=${session}`);
    }
  }

  return fetch(input, {
    ...init,
    headers,
    ...(isServer ? {} : { credentials: 'include' }),
  });
};
