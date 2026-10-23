import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Demo store is fully client-side. Skip the generated agent guide.
  agentRules: false,
};

export default nextConfig;
