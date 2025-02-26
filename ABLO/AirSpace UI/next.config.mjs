/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.airspace.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
