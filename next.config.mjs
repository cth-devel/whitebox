/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site to ./out on `next build`.
  // Works on any cPanel/Apache host — no Node.js needed.
  output: "export",

  // Generate /about/index.html, /track/index.html, etc.
  // Makes Apache routing trivial and avoids extension surprises.
  trailingSlash: true,

  // next/image's optimizer is a server feature — disable it for static export.
  images: { unoptimized: true },
};

export default nextConfig;
