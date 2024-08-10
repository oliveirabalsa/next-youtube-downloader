import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/videos/:path*',
        destination: `/videos/:path*`, // Serve video files from the "videos" directory
      },
    ];
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve('./src');
    return config;
  },
};

export default nextConfig;
