/** @type {import('next').NextConfig} */

const nextConfig = {
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

module.exports = nextConfig;
