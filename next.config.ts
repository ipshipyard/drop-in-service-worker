import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Necessary for static export
  images: {
    unoptimized: true,
  },
  output: 'export',
};

export default nextConfig;
