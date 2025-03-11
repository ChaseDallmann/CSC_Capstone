/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable strict mode in React to spot potential issues
    reactStrictMode: true,
    
    // This function can be used to rewrite API requests if needed
    async rewrites() {
      return [
        // If you want to proxy API requests through Next.js
        // (alternative to direct API calls)
        /*
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*',
        },
        */
      ];
    },
  };
  
  module.exports = nextConfig;