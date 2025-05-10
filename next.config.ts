import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
        port: '',
        pathname: '/artego-bucket/**',
      },
    ],
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
