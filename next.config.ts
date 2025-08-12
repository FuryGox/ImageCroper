import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  basePath: isProd ? '/ImageCroper' : '', assetPrefix: isProd ? '/ImageCroper/' : '', images: {
    unoptimized: true, // GitHub Pages does not support Next.js image optimization }, 
  },
}

  export default nextConfig;
