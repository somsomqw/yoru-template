/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.picsum.photos", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
