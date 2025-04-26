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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    console.log('Rewrites using API URL:', apiUrl);
    // Always proxy API calls to the Spring Boot backend
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`, // Spring Boot on EC2
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