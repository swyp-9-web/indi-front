import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // kr.object.ncloudstorage.com : 더미 데이터 (임시)
    domains: ['kr.object.ncloudstorage.com'],
  },

  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: `http://211.188.54.19:8000/:path*`,
      },
    ];
  },

  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
