import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  typescript: {
    // Ignore TypeScript errors during build for documentation files
    ignoreBuildErrors: false,
  },
  // Exclude documentation files from build
  webpack: (config) => {
    config.externals = [...(config.externals || [])];
    return config;
  },
};

export default nextConfig;
