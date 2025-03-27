/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images: {
    domains: [
      'api.dicebear.com',
      'via.placeholder.com',
      'placehold.co',
      'fastly.picsum.photos'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
};

export default config;
