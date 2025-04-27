import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['fastly.picsum.photos'], // 임시 추가 (product-list.mock.ts)
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
