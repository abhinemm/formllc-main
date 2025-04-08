import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enforces best practices during development
  experimental: {
    serverComponentsExternalPackages: ["pg", "sequelize"], // Specify external packages for server components
  },
  typescript: {
    ignoreBuildErrors: true, // Suppresses TypeScript build errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Suppresses ESLint warnings during the build process
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "utility.formllc.io",
      "utilitymain.formllc.io",
    ],
  },
};

export default nextConfig;
