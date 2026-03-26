/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", pathname: "/**" },
      { protocol: "https", hostname: "**.wp.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "bonotnew.getkgkrunch.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
