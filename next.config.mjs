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
    // For local development, proxy API calls to the backend
    // For production on EC2, nginx will handle this
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/:path*', // Local Spring Boot 
        },
      ];
    }
    
    // In production, no rewrites needed as nginx handles it
    return [];
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