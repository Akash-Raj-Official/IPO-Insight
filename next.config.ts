import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "IPO-Insight";

const nextConfig: NextConfig = {
  output: "export",
  // When deployed to GitHub Pages the site is served from /<repoName>/
  // so all asset URLs must be prefixed with that path.
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
