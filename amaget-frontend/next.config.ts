import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    qualities: [88, 90, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dawdn2m0d/**",
      },
    ],
  },
};

export default nextConfig;
