// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enables hot-reload and easy integration for local packages
    transpilePackages: [
      "@acme/api",
      "@acme/db",
      "@acme/validations",
      "@acme/emails",
      "@agotao/utils",
    ],
  },
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "storage.googleapis.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

export default config;
