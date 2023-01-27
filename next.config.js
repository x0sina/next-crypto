/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['s2.coinmarketcap.com', 's3.coinmarketcap.com'],
  },
}

module.exports = nextConfig
