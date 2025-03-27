/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        '**'
      ],
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '**',
        },
        {
          protocol: 'https',
          hostname: '**',
        }
      ]
    }
  }
  
  export default nextConfig