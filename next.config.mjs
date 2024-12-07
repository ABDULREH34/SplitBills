/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,  // Disable React Strict Mode to avoid additional checks during hydration
    webpack: (config, { dev }) => {
      if (!dev) {
        config.devtool = false; // Disable source maps in production
      }
      return config;
    },
  };
  
  export default nextConfig;
  