/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Tambahkan host Firebase Storage di sini
  },
};

module.exports = nextConfig;
