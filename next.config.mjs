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
});


export default withPWA({nextConfig});
