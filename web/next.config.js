/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      's.gravatar.com',
      'res.cloudinary.com',
      'tailwindui.com',
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;
