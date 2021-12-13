/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    /** @see https://github.com/vercel/next.js/issues/30750 */
    esmExternals: false,
  },
  eslint: {
    // Only run ESLint on following directories during production builds
    dirs: ["pages", "utils", "lib", "components"],
  },
  /** @see https://nextjs.org/docs/advanced-features/compiler#minification */
  swcMinify: true,
  optimizeFonts: true,
  async Headers() {
    return [
      {
        source: "/(.*)",
        headers: require("@biolnk/config/security-headers"),
      },
    ];
  },
};

module.exports = nextConfig;
