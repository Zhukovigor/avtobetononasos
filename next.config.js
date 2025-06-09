/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "avtobetononasos.vercel.app"],
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
  },
  // Отключаем статическую генерацию для админ-раздела
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "x-nextjs-data",
            value: "force-dynamic",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
