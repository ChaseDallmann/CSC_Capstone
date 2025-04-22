/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
};

export default nextConfig;