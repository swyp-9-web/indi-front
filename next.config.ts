import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // fastly.picsum.photos : 팔로잉 목록 데이터 (임시)
    // kr.object.ncloudstorage.com : 더미 데이터 (임시)
    domains: ['fastly.picsum.photos', 'kr.object.ncloudstorage.com'],
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
