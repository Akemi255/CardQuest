/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "via.placeholder.com",
      "i.postimg.cc",
      "cdn.myanimelist.net",
    ],
  },
};

module.exports = nextConfig;
