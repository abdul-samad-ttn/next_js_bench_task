import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  /* config options here */
  output: isGhPages ? "export" : undefined,
  basePath: isGhPages ? "/next_js_bench_task" : "",
  assetPrefix: isGhPages ? "/next_js_bench_task/" : undefined,
  images: { unoptimized: isGhPages },
  experimental: {
    agentFeedback: true,
  },
  ...(isGhPages ? {} : {
    cacheComponents: true,
    partialPrefetching: true,
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
      },
    },
  },
};

export default nextConfig;
