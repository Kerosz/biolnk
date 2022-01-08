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
    dirs: ["pages", "lib", "components"],
  },
  /**
   * Investigating an issue with using `swcMinify` where `vest` form validation
   * throws an error caused by the minification of `swc`
   *
   * @see https://nextjs.org/docs/advanced-features/compiler#minification
   */
  swcMinify: true,
  optimizeFonts: true,
  images: {
    domains: [
      "luvvzhalwfofocddxfrk.supabase.in",
      "qatejhwdylvqgwcegrjn.supabase.co",
      "qatejhwdylvqgwcegrjn.supabase.in",
    ],
  },
  async Headers() {
    return [
      {
        source: "/(.*)",
        headers: require("@biolnk/core/config/next/headers"),
      },
    ];
  },
};

module.exports = nextConfig;
