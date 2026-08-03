/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves static files only — no Node server, no middleware,
  // no image optimization endpoint, no API routes.
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
