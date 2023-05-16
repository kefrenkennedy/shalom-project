/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'shalomsobral.com', 'api.shalomsobral.com'],
  },
};

module.exports = nextConfig;
