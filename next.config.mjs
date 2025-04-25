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
    // Only apply rewrites if we're not using direct URLs
    // This helps avoid mixed content issues in production
    const backendUrl = process.env.BACKEND_URL || 'http://44.204.26.211:5000';
    
    // If we're using a direct URL (starts with http), don't use rewrites
    if (backendUrl.startsWith('http')) {
      return [];
    }
    
    return [
      {
        source: '/api/:path*',
        destination: 'http://44.204.26.211:5000/:path*',
      },
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