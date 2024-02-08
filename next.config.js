/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_PROTOCOL: process.env.API_PROTOCOL,
        API_HOST: process.env.API_HOST,
        ...(process.env.API_PORT ? {API_PORT: process.env.API_PORT} : {}),
    },
    async rewrites() {
        return [
            {
                source: "/theme-content/:path*",
                destination: "/:path*"
            },
            {
                source: "/e-commerce/:path*",
                destination: "/:path*"
            }
        ]
    },
    reactStrictMode: false,
    swcMinify: true,
    images: {
        //unoptimized: true,
        remotePatterns: [
            {
                protocol: process.env.API_PROTOCOL,
                hostname: process.env.API_HOST,
                ...(process.env.API_PORT ? {port: process.env.API_PORT} : {}),
                pathname: "/uploads/**"
            },
        ],
    }
}

module.exports = nextConfig