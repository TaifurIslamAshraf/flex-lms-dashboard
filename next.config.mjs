/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flex-lms-server-production.up.railway.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api.oneselfbd.com",
      },
    ],
  },
};

export default nextConfig;
