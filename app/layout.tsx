import localFont from 'next/font/local';
import Script from 'next/script';

import Providers from '@/app/_provider';

import GlobalNavBar from './_components/layout/GlobalNavBar';
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
          <div className="pt-14" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
