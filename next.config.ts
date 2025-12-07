import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'msm-mm.t3.storage.dev',
      },
      {
        protocol: 'https',
        hostname: 'msm-mm.fly.storage.tigris.dev',
      },
      {
        protocol: 'https',
        hostname: 'fly.storage.tigris.dev',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  
};

export default nextConfig;
