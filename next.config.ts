import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/blog",
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
