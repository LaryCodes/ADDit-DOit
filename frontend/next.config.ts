import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    return config;
  },
  // Disable Turbopack for production builds to avoid path resolution issues
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
