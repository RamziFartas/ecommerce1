/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  nextauth_url:'https://ecommerce1-ljfd.vercel.app/api/auth/callback/google',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

module.exports = nextConfig;
