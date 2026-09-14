/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // "images.domains" foi descontinuado no Next 15 (aviso em runtime);
        // o equivalente atual é remotePatterns.
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
};

export default nextConfig;
