/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'out',
  images: {
    loader: 'akamai',
    path: '',
  },
}

module.exports = nextConfig
