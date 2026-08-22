import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Allow missing product images without breaking build
    unoptimized: false,
  },
  // Don't fail build on missing images
  typescript: {
    ignoreBuildErrors: false,
  },
};

// Only wrap with Payload when env is configured (avoids build crash without DB)
const usePayload =
  Boolean(process.env.PAYLOAD_SECRET) && Boolean(process.env.DATABASE_URI);

async function getConfig() {
  if (usePayload) {
    const { withPayload } = await import("@payloadcms/next/withPayload");
    return withPayload(nextConfig);
  }
  return nextConfig;
}

export default getConfig();
