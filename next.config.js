const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Include mdx files
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  webpack: (config, { buiildId, dev, isServer, defaultLoaders, webpack }) => {
    // config.resolve.alias.canvas = false
    // config.resolve.alias.encoding = false
    return config;
  },
};

module.exports = withMDX(nextConfig);
