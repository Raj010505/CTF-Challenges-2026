import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/exploit": ["./bin/**/*"],
  },
};

export default nextConfig;
