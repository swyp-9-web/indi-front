import { describe, expect, it } from 'vitest';

import { detectPlatformFromUrl } from '@/utils/url';

describe('detectPlatformFromUrl', () => {
  it('should correctly detect Pinterest domain', () => {
    expect(detectPlatformFromUrl('https://www.pinterest.com/test')?.label).toBe('pinterest');
    expect(detectPlatformFromUrl('https://kr.pinterest.com/some')?.label).toBe('pinterest');
  });

  it('should correctly detect Facebook domain', () => {
    expect(detectPlatformFromUrl('https://facebook.com')?.label).toBe('facebook');
    expect(detectPlatformFromUrl('https://www.facebook.com/user')?.label).toBe('facebook');
  });

  it('should correctly detect Instagram domain', () => {
    expect(detectPlatformFromUrl('https://www.instagram.com/user')?.label).toBe('instagram');
  });

  it('should correctly detect Naver Blog domain', () => {
    expect(detectPlatformFromUrl('https://blog.naver.com/abc123')?.label).toBe('네이버블로그');
  });

  it('should correctly detect Behance domain', () => {
    expect(detectPlatformFromUrl('https://www.behance.net/user123')?.label).toBe('behance');
  });

  it('should return null for unknown domains', () => {
    expect(detectPlatformFromUrl('https://unknownsite.com')).toBe(null);
  });

  it('should return null for invalid URL formats', () => {
    expect(detectPlatformFromUrl('not-a-valid-url')).toBe(null);
  });
});
