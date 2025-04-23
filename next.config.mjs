/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
  images: {
    unoptimized: true,
  },
  // Set to accommodate pages directory
  useFileSystemPublicRoutes: true,
  // Add configuration for API to connect to backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL || 'http://teashop-backend.eba-pmfpikpv.us-east-1.elasticbeanstalk.com/:path*',
      },
    ];
  },
};

export default nextConfig;