import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Aktiivan-kotisivut',
  assetPrefix: '/Aktiivan-kotisivut',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;