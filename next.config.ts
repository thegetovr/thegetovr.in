import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.3"],

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    qualities: [25, 50, 70, 75, 80, 90, 100],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
