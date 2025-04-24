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
      // Add proxy for the EC2 backend
      {
        source: '/backend/:path*',
        destination: 'http://44.204.26.211:5000/:path*',
      },
    ];
  },
  // Exclude deployment folder from build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: '.next',
  // Ignore type errors during builds
  transpilePackages: ['CSC_Capstone_Deployment']
};

export default nextConfig;