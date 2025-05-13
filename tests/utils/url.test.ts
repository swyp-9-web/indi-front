import { describe, expect, it } from 'vitest';

import { detectPlatformFromUrl } from '@/utils/url';

describe('detectPlatformFromUrl 함수 테스트', () => {
  it('Pinterest 도메인을 정확히 감지', () => {
    expect(detectPlatformFromUrl('https://www.pinterest.com/test')?.label).toBe('pinterest');
    expect(detectPlatformFromUrl('https://kr.pinterest.com/some')?.label).toBe('pinterest');
  });

  it('Facebook 도메인을 정확히 감지', () => {
    expect(detectPlatformFromUrl('https://facebook.com')?.label).toBe('facebook');
    expect(detectPlatformFromUrl('https://www.facebook.com/user')?.label).toBe('facebook');
  });

  it('Instagram 도메인을 정확히 감지', () => {
    expect(detectPlatformFromUrl('https://www.instagram.com/user')?.label).toBe('instagram');
  });

  it('네이버 블로그 도메인을 정확히 감지', () => {
    expect(detectPlatformFromUrl('https://blog.naver.com/abc123')?.label).toBe('네이버블로그');
  });

  it('Behance 도메인을 정확히 감지', () => {
    expect(detectPlatformFromUrl('https://www.behance.net/user123')?.label).toBe('behance');
  });

  it('알 수 없는 도메인인 경우 null 반환', () => {
    expect(detectPlatformFromUrl('https://unknownsite.com')).toBe(null);
  });

  it('잘못된 URL 형식은 null 반환', () => {
    expect(detectPlatformFromUrl('not-a-valid-url')).toBe(null);
  });
});
