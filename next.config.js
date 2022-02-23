/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.graphcms.com", "i.scdn.co"],
  },
};

module.exports = nextConfig;
