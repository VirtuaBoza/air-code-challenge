/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "air-prod.imgix.net",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
