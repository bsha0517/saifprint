import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: the site can be hosted on any static host (out/ folder).
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Images are pre-optimised by scripts/build-assets.mjs.
    unoptimized: true,
  },
  turbopack: {
    // Pin the workspace root (a stray lockfile exists higher up in the user directory).
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
