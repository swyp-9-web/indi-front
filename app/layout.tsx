import { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import { SpeedInsights } from '@vercel/speed-insights/next';

import Providers from '@/app/_provider';
import { Toaster } from '@/components/ui/sonner';

import GlobalNavBar from './_components/layout/GlobalNavBar';
import LoginDialog from './_components/shared/LoginDialog';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard-variable',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  title: 'Artego | 당신의 첫 전시, 지금 시작하세요',
  description: '신진 작가의 큐레이션 플랫폼, Artego에서 작품을 소개해보고, 반응을 확인해보세요',
  keywords: [
    '작가모집',
    '포트폴리오사이트',
    '작품등록',
    '온라인전시',
    '작가공모',
    '디지털포트폴리오',
    '창작자지원',
    '신진작가지원',
    '아트커머스',
    '디자인플랫폼',
    '핸드메이드작가',
    '수공예작가',
    '도예작가',
    '아트웍',
    '텍스타일디자인',
    '제품디자인',
    '졸업전시',
    '디자인졸업작품',
    '공예작가',
    '신진디자이너',
    '창작자브랜딩',
    '디자이너마켓',
    '아트마켓',
    '디자인판매',
    'creatoreconomy',
    'portfoliohub',
    'designmarket',
  ],
  openGraph: {
    title: 'Artego | 당신의 첫 전시, 지금 시작하세요',
    description: '신진 작가를 위한 온라인 전시 플랫폼',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/head/artego.png`,
        alt: 'Artego 대표 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artego | 당신의 첫 전시, 지금 시작하세요',
    description: '신진 작가의 큐레이션 플랫폼, Artego에서 작품을 소개해보세요',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/head/artego.png`,
        alt: 'Artego 대표 이미지',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script
          src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={pretendard.className}>
        <Providers>
          <GlobalNavBar />
          {children}
          <LoginDialog />
          <Toaster position="bottom-center" />
        </Providers>

        <SpeedInsights />
      </body>
    </html>
  );
}
