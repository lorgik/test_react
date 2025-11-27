import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.wikia.nocookie.net",
                port: "",
                pathname: "/disney/images/**",
            },
            {
                protocol: "https",
                hostname: "disney.fandom.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
}

export default nextConfig
