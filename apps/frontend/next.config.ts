import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/LeadFlow",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
