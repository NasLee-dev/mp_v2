/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.iconfinder.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: '**.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.randomuser.me',
      },
    ],
  },
}

module.exports = nextConfig
