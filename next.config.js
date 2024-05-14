/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "via.placeholder.com",
      "i.postimg.cc",
      "cdn.myanimelist.net",
      "i.imgur.com",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
