type LinkName = 'pinterest' | 'facebook' | 'behance' | 'instagram' | '네이버블로그';

interface PlatformInfo {
  label: LinkName;
  iconSrc: string;
}

const PLATFORM_MAP: Record<string, PlatformInfo> = {
  'pinterest.com': { label: 'pinterest', iconSrc: '/icons/pinterest.png' },
  'facebook.com': { label: 'facebook', iconSrc: '/icons/facebook.png' },
  'behance.net': { label: 'behance', iconSrc: '/icons/behance.png' },
  'blog.naver.com': { label: '네이버블로그', iconSrc: '/icons/naver-blog.png' },
  'instagram.com': { label: 'instagram', iconSrc: '/icons/instagram.png' },
};

/**
 * 주어진 URL에서 소셜 플랫폼 정보를 추출합니다.
 *
 * 이 함수는 URL의 호스트명을 분석하여 미리 정의된 플랫폼 도메인 목록에 매칭되는 항목을 찾습니다.
 * Pinterest, Facebook, Behance, Instagram, 네이버블로그와 같은 주요 소셜 플랫폼을 감지하며,
 * 각 플랫폼에 대한 label과 iconSrc 경로를 포함한 객체를 반환합니다.
 *
 * 잘못된 URL 형식이거나 매칭되는 도메인이 없는 경우 null을 반환합니다.
 *
 * @param url - 검사할 전체 URL 문자열 (예: 'https://www.instagram.com/user123')
 * @returns 플랫폼 정보 객체(label, iconSrc) 또는 null
 *
 * @example
 * detectPlatformFromUrl('https://www.facebook.com/somepage');
 * // 반환: { label: 'facebook', iconSrc: '/icons/facebook.png' }
 *
 * detectPlatformFromUrl('https://unknown.com');
 * // 반환: null
 */
export function detectPlatformFromUrl(url: string): PlatformInfo | null {
  try {
    const host = new URL(url).hostname.toLowerCase();

    const matchedKey = Object.keys(PLATFORM_MAP).find((domain) => host.includes(domain));

    return matchedKey ? PLATFORM_MAP[matchedKey] : null;
  } catch {
    return null;
  }
}
