import type {NextConfig} from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
    // Enable standalone output for optimized production builds
    output: 'standalone',

    // Optimize images
    images: {
        unoptimized: true,
        formats: ['image/webp', 'image/avif'],
    },

    // Compression
    compress: true,

    // Experimental features for better performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['react-icons'],
    },

    // Performance and Security headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    // Security headers
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                    // Performance headers
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            // Static assets caching
            {
                source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf|png|jpg|jpeg|gif|ico|svg)$',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default withBundleAnalyzer(nextConfig);
