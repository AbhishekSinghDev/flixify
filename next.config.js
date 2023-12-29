/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "mango.blender.org",
      "download.blender.org",
      "uhdtv.io",
      "upload.wikimedia.org",
      "raw.githubusercontent.com",
      "image.tmdb.org",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
