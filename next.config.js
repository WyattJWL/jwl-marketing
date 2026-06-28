/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.jwl-marketing.fr', 'jwl-marketing.fr'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
