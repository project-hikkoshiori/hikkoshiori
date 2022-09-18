/** @type {import('next').NextConfig} */

const TerserPlugin = require("terser-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  webpack: (config, options) => {
    config.optimization.minimize = true;
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
        extractComments: "all",
      }),
    ];
    return config;
  },
}

module.exports = nextConfig
