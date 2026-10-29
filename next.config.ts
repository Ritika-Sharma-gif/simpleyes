import type { NextConfig } from "next";

/**
 * The site is fully static (no server runtime is required), so it is exported
 * to `out/`. That keeps it deployable to Vercel, GitHub Pages (where the
 * current simplyes.de is hosted) or any static host / CDN.
 *
 * Security headers cannot be set from a static export; they are configured in
 * `vercel.json` for Vercel. See docs/DEPLOYMENT.md for other hosts.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ["three"],
  poweredByHeader: false,
  images: {
    // Static export has no image optimisation server. All raster assets are
    // pre-optimised (WebP/AVIF, correct dimensions) and most visuals are SVG.
    unoptimized: true,
  },
};

export default nextConfig;
