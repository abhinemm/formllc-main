import type { NextConfig } from "next";
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['pg', 'sequelize']
  }
};

export default nextConfig;
