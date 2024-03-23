// @ts-check

import withPWAInit from "@ducanh2912/next-pwa";
const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    assetPrefix: isProd ? process.env.ASSET_PREFIX || "https://anjochow.com" : "",
    generateBuildId: () => {
        return process.env.APP_VERSION || `${new Date().getTime()}`;
    }
};

const withPWA = withPWAInit({
    dest: "public",
    extendDefaultRuntimeCaching: true,
    fallbacks: {
        // Failed page requests fallback to this.
        document: "/~offline",
        // This is for /_next/.../.json files.
        data: "/fallback.json",
        // This is for images.
        image: "/fallback.webp",
        // This is for audio files.
        audio: "/fallback.mp3",
        // This is for video files.
        video: "/fallback.mp4",
        // This is for fonts.
        font: "/fallback-font.woff2",
    },
});


export default withPWA({ nextConfig });
