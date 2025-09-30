import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Remove outputFileTracingRoot as it's causing deployment issues
  // This was likely added for a monorepo setup but isn't needed for a single app
};

export default nextConfig;
