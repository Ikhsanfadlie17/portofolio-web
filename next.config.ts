import type { NextConfig } from "next";

// Static export: hasil build (folder out/) bisa dihosting di Vercel maupun GitHub Pages.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
